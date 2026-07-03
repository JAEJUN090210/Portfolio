export async function downloadPortfolioPdf(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error('PDF target element was not found.');
  }

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: Math.min(window.devicePixelRatio || 1, 2),
    useCORS: true,
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imageHeight = (canvas.height * pdfWidth) / canvas.width;
  let heightLeft = imageHeight;
  let position = 0;
  const imageData = canvas.toDataURL('image/png');

  pdf.addImage(imageData, 'PNG', 0, position, pdfWidth, imageHeight, undefined, 'FAST');
  heightLeft -= pdfHeight;

  while (heightLeft > 0) {
    position = heightLeft - imageHeight;
    pdf.addPage();
    pdf.addImage(imageData, 'PNG', 0, position, pdfWidth, imageHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;
  }

  pdf.save(fileName);
}
