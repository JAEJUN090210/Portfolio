export async function downloadPortfolioPdf(elementId: string, fileName: string) {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error('PDF target element was not found.');
  }

  if ('fonts' in document) {
    await document.fonts.ready;
  }

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const captureWidth = element.scrollWidth;
  const captureHeight = element.scrollHeight;

  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: Math.max(2, Math.min(window.devicePixelRatio || 1, 2.5)),
    useCORS: true,
    width: captureWidth,
    height: captureHeight,
    windowWidth: captureWidth,
    windowHeight: captureHeight,
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imageHeight = (canvas.height * pdfWidth) / canvas.width;
  const pageCount = Math.ceil(imageHeight / pdfHeight - 0.01);
  const imageData = canvas.toDataURL('image/png');

  pdf.setProperties({
    title: fileName.replace(/\.pdf$/i, ''),
    subject: 'Portfolio',
    creator: 'Jaejun Jeon Portfolio',
  });

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    if (pageIndex > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      imageData,
      'PNG',
      0,
      -pageIndex * pdfHeight,
      pdfWidth,
      imageHeight,
      undefined,
      'SLOW',
    );
  }

  pdf.save(fileName);
}
