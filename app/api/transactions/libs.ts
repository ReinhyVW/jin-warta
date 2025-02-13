import { PDFDocument } from 'pdf-lib'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3, GetObjectCommand } from '@aws-sdk/client-s3';
import { TransactionData } from '@/types';

const endpoint = process.env.R2_ENDPOINT
const accessKey = process.env.R2_ACCESS_KEY
const secretKey = process.env.R2_SECRET_KEY
const bucketName = 'jin-warta'

const signUrl = async (fileName: string): Promise<string> => {
  const s3 = new S3({
    endpoint: endpoint,
    credentials: {
      accessKeyId: accessKey || "",
      secretAccessKey: secretKey || "",
    },
    region: "auto",
  });

  const signedUrl = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    }),
    {
      expiresIn: 60 * 5, // 5 minutes
    }
  );

  return signedUrl;
};



const uploadFile = async (file: Uint8Array, newFileName: string) => {
  const s3 = new S3({
    endpoint: endpoint,
    credentials: {
      accessKeyId: accessKey || "",
      secretAccessKey: secretKey || "",
    },
    region: "auto",
  });

  try {
    const uploadedPdf = await s3.putObject({
      Bucket: bucketName,
      Key: newFileName,
      Body: file,
      ContentType: 'application/pdf',
    })

    const newPdfUrl = signUrl(newFileName)

    return newPdfUrl
  }
  catch (err) {
    console.error(err);
    return "";
  }
};

export async function createTransactionReceipt(transactionData: TransactionData) {
  const signedUrl = await signUrl('S-24.pdf')

  const formPdf = await fetch(signedUrl)
  const formPdfBytes = await formPdf.arrayBuffer()
  const pdfDoc = await PDFDocument.load(formPdfBytes)

  const form = pdfDoc.getForm()
  const date = form.getTextField('date')
  const transaction_type = form.getCheckBox(transactionData.transaction_type.toString())
  const world_order = form.getTextField('world_order')
  const congregation_expenses = form.getTextField('congregation_expenses')
  const extra_description1 = form.getTextField('extra_description1')
  const extra_amount1 = form.getTextField('extra_amount1')
  const extra_description2 = form.getTextField('extra_description2')
  const extra_amount2 = form.getTextField('extra_amount2')
  const extra_description3 = form.getTextField('extra_description3')
  const extra_amount3 = form.getTextField('extra_amount3')
  const total = form.getTextField('total')
  const filled_by = form.getTextField('filled_by')
  const verified_by = form.getTextField('verified_by')

  date.setText(transactionData.date)
  transaction_type.check()
  world_order.setText(transactionData.world_order.toString())
  congregation_expenses.setText(transactionData.congregation_expenses.toString())
  extra_description1.setText(transactionData.extra_description1)
  extra_amount1.setText(transactionData.extra_amount1.toString())
  extra_description2.setText(transactionData.extra_description2)
  extra_amount2.setText(transactionData.extra_amount2.toString())
  extra_description3.setText(transactionData.extra_description3)
  extra_amount3.setText(transactionData.extra_amount3.toString())
  total.setText(transactionData.total.toString())
  filled_by.setText(transactionData.filled_by)
  verified_by.setText(transactionData.verified_by)

  const pdfBytes = await pdfDoc.save()
  const pdfUploaded = await uploadFile(pdfBytes, `receipt-${transactionData.id?.toString()}.pdf`)

  return pdfUploaded
}
