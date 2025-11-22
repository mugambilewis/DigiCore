const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { formatCurrency } = require('./currencyConverter');

/**
 * Generate a PDF receipt for an order
 * @param {Object} orderData - Order data including items, user info, totals
 * @returns {Promise<string>} - Path to the generated receipt file
 */
const generateReceipt = async (orderData) => {
  return new Promise((resolve, reject) => {
    try {
      // Create receipts directory if it doesn't exist
      const receiptsDir = path.join(__dirname, '../receipts');
      if (!fs.existsSync(receiptsDir)) {
        fs.mkdirSync(receiptsDir, { recursive: true });
      }

      // Generate unique filename
      const filename = `receipt_${orderData.orderId}_${Date.now()}.pdf`;
      const filepath = path.join(receiptsDir, filename);

      // Create PDF document
      const doc = new PDFDocument({ margin: 50 });

      // Pipe to file
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Header
      doc.fontSize(24).text('DigiCore', { align: 'center' });
      doc.fontSize(16).text('Digital Electronics Store', { align: 'center' });
      doc.moveDown();

      // Receipt details
      doc.fontSize(14).text('RECEIPT', { align: 'center', underline: true });
      doc.moveDown();
      doc.fontSize(10).text(`Receipt #: ${orderData.orderId}`, { align: 'left' });
      doc.text(`Date: ${new Date(orderData.createdAt).toLocaleString('en-KE')}`, { align: 'left' });
      doc.moveDown();

      // Customer information
      if (orderData.shippingData) {
        doc.fontSize(12).text('Bill To:', { underline: true });
        doc.fontSize(10);
        if (orderData.shippingData.fullName) doc.text(orderData.shippingData.fullName);
        if (orderData.shippingData.address) doc.text(orderData.shippingData.address);
        if (orderData.shippingData.city) doc.text(orderData.shippingData.city);
        if (orderData.shippingData.postalCode) doc.text(orderData.shippingData.postalCode);
        if (orderData.shippingData.country) doc.text(orderData.shippingData.country);
        if (orderData.shippingData.phone) doc.text(`Phone: ${orderData.shippingData.phone}`);
        doc.moveDown();
      }

      // Items table header
      doc.fontSize(12).text('Items:', { underline: true });
      doc.moveDown(0.5);
      
      // Table headers
      const tableTop = doc.y;
      doc.fontSize(10);
      doc.text('Item', 50, tableTop);
      doc.text('Qty', 300, tableTop);
      doc.text('Price', 350, tableTop);
      doc.text('Total', 420, tableTop);
      
      // Draw line under headers
      doc.moveTo(50, doc.y + 5).lineTo(500, doc.y + 5).stroke();
      doc.moveDown();

      // Items
      let itemsTop = doc.y;
      orderData.items.forEach((item, index) => {
        const y = itemsTop + (index * 20);
        doc.text(item.name.substring(0, 30), 50, y);
        doc.text(item.quantity.toString(), 300, y);
        doc.text(formatCurrency(item.price, 'KES'), 350, y);
        doc.text(formatCurrency(item.price * item.quantity, 'KES'), 420, y);
      });

      doc.y = itemsTop + (orderData.items.length * 20) + 10;
      doc.moveDown();

      // Totals
      doc.moveTo(350, doc.y).lineTo(500, doc.y).stroke();
      doc.moveDown(0.5);
      doc.text('Subtotal:', 350, doc.y);
      doc.text(formatCurrency(orderData.subtotal, 'KES'), 420, doc.y);
      doc.moveDown();
      doc.text('Shipping:', 350, doc.y);
      doc.text(formatCurrency(orderData.shipping, 'KES'), 420, doc.y);
      doc.moveDown();
      doc.text('Tax:', 350, doc.y);
      doc.text(formatCurrency(orderData.tax, 'KES'), 420, doc.y);
      doc.moveDown();
      doc.fontSize(12).font('Helvetica-Bold');
      doc.text('Total:', 350, doc.y);
      doc.text(formatCurrency(orderData.total, 'KES'), 420, doc.y);
      doc.moveDown(2);

      // Footer
      doc.fontSize(10).font('Helvetica');
      doc.text('Thank you for your purchase!', { align: 'center' });
      doc.text('DigiCore - Your Digital Electronics Store', { align: 'center' });

      // Finalize PDF
      doc.end();

      stream.on('finish', () => {
        // Return relative path for storage in database
        const relativePath = `/receipts/${filename}`;
        resolve(relativePath);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateReceipt };

