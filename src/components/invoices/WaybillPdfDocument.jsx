import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import JsBarcode from 'jsbarcode'; // Import JsBarcode for barcode generation
import companyLogo from '../../assets/expresslano.png'; // Adjust the path as necessary

// Register a font for the PDF. Open Sans is a good alternative for Arial, matching the sans-serif look.
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf'
});

const styles = StyleSheet.create({
  companyLogo: {
    width: 120, // Adjusted width to match the image
    height: 150, // Adjusted height to match the image
    // marginBottom: 1,
    objectFit: 'cover',
  },
  // Base page and section styles
  page: {
    fontFamily: 'Open Sans',
    padding: 10, // Adjusted padding to fit more content per copy
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  // Container for a single waybill copy
  waybillContainer: {
    borderWidth: 2,
    marginTop: 10,
    borderColor: '#000',
    marginBottom: 5, // Space between copies on the same page
    padding: 0, // No internal padding as sections handle it
    flexShrink: 0, // Prevents stretching
    height: 380, // Fixed height for each copy
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    borderTopWidth: 0, // Most cells don't have top border, handled by sections
    borderLeftWidth: 0, // Most cells don't have left border, handled by sections
    padding: 2, // Minimal padding
    fontSize: 8, // Base font size
  },
  // Specific styling for the first cells in a row to have left border
  cellFirst: {
    borderLeftWidth: 1,
  },
  // Specific styling for the first cells in a section to have top border
  cellTopFirst: {
    borderTopWidth: 1,
  },

  // Header Section (Logo, Barcode, Meta Info)
  headerSection: {
    flexDirection: 'row',
    height: 90, // Fixed height for header section
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  logoBarcodeContainer: {
    width: '35%', // Adjusted width to match image
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#000',
  },
  logoPlaceholder: {
    width: 80,
    height: 20,
    marginBottom: 5,
    backgroundColor: '#fff', // White background
    // If you have an actual logo, use <Image style={styles.logo} src="/path/to/your/logo.png" />
  },
  companyName: {
    fontSize: 6,
    fontWeight: 'bold',
    position: 'absolute',
    left: 8,
    top: 5,
  },
  barcodeImage: {
    width: 100, // Adjust width to fit the barcode
    height: 25, // Adjust height
    marginBottom: 2,
  },
  waybillIdHeader: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  copyTypeHeader: {
    fontSize: 8,
  },
  pickupDeliveryMeta: {
    width: '65%', // Adjusted width to match image
    flexDirection: 'row',
    position: 'relative', // For absolute positioning of carrier info
  },
  pickupColumn: {
    width: '50%',
    borderRightWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  deliveryColumn: {
    width: '50%',
    padding: 5,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  metaLabel: {
    fontWeight: 'bold',
    width: '45%', // Adjusted for better alignment
    fontSize: 7, // Smaller font for meta labels
  },
  metaValue: {
    width: '55%',
    fontSize: 7, // Smaller font for meta values
  },
  carrierMetaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f2f2f2', // Light grey background for carrier info
    paddingTop: 2,
    paddingHorizontal: 5,
  },
  carrierMetaRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  carrierLabel: {
    fontWeight: 'bold',
    width: '40%', // Adjust width
    fontSize: 7,
  },
  carrierValue: {
    width: '60%',
    fontSize: 7,
  },


  // Shipper/Consignee Section
  partySection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  partyColumn: {
    width: '50%',
    borderRightWidth: 1,
    borderColor: '#000',
    flexDirection: 'column', // Stack children vertically
  },
  partyColumnLast: {
    borderRightWidth: 0,
  },
  partyTitleCell: {
    backgroundColor: '#f2f2f2', // Light grey background
    padding: 3,
    fontWeight: 'bold',
    fontSize: 9,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 1, // Only for the first title cell
    borderTopWidth: 1, // Only for the first title cell
    textAlign: 'left', // Aligned left
  },
  partyTitleCellRight: {
    borderLeftWidth: 0,
  },
  partyDetailCell: {
    padding: 3,
    borderBottomWidth: 1,
    borderColor: '#000',
    minHeight: 15, // Ensure some height for empty lines
    borderLeftWidth: 1, // For first detail cell
    fontSize: 8,
  },
  partyDetailCellRight: {
    borderLeftWidth: 0,
  },
  addressCell: {
    minHeight: 40, // Height for address lines
    padding: 3,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 1, // For first detail cell
    fontSize: 8,
  },
  addressCellRight: {
    borderLeftWidth: 0,
  },
  statusCommentCell: {
    padding: 3,
    minHeight: 50, // Height for status/comment
    borderLeftWidth: 1,
    fontSize: 8,
  },
  statusCommentCellRight: {
    borderLeftWidth: 0,
  },

  // Shipment Details Table
  shipmentTable: {
    flexDirection: 'column',
  },
  shipmentRow: {
    flexDirection: 'row',
  },
  shipmentCellLabel: {
    width: '20%', // Adjust width for labels
    backgroundColor: '#f2f2f2',
    padding: 3,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 1, // First cell in row
    fontSize: 8,
  },
  shipmentCellValue: {
    width: '30%', // Adjust width for values
    padding: 3,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 1,
    fontSize: 8,
  },
  shipmentCellValueWide: {
    width: '80%', // For Type of Shipment (spans 3 columns)
    padding: 3,
    borderBottomWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 1,
    fontSize: 8,
  },
  shipmentCellLastRow: {
    borderBottomWidth: 1, // Ensure the last row has a bottom border
  },
  shipmentCellRightAlign: {
    textAlign: 'right',
  },

  // Footer Timestamp
  footerTimestamp: {
    position: 'absolute',
    bottom: 5, // Adjusted to be very close to the bottom edge
    left: 5,
    fontSize: 7,
  },
});

// Function to generate barcode SVG as a data URL
const generateBarcodeDataURL = (value) => {
  if (!value) return '';
  const canvas = document.createElement('canvas');
  try {
    JsBarcode(canvas, value, {
      format: 'CODE128', // Use Code 128 for alphanumeric data
      displayValue: false, // Do not display human-readable text below barcode
      width: 1.5, // Narrower bars
      height: 40, // Shorter barcode
      margin: 0,
    });
    return canvas.toDataURL('image/png'); // Use PNG for better quality in PDF
  } catch (e) {
    console.error("Error generating barcode:", e);
    return '';
  }
};

// Reusable component for a single waybill copy layout
const WaybillSingleCopyLayout = ({ packageData, copyType }) => {
  const barcodeDataUrl = generateBarcodeDataURL(packageData.packageId);

  return (
    <View style={styles.waybillContainer}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoBarcodeContainer}>
          <View style={styles.logoPlaceholder}>
            <Image style={styles.companyLogo} src={companyLogo} />
         </View>
          {/* <Text style={styles.companyName}>EXPRESSLANE LOGISTICS</Text> */}
          {barcodeDataUrl && (
            <Image style={styles.barcodeImage} src={barcodeDataUrl} />
          )}
          <Text style={styles.waybillIdHeader}>{packageData.packageId || 'N/A'}</Text>
          <Text style={styles.copyTypeHeader}>{copyType}</Text>
        </View>

        <View style={styles.pickupDeliveryMeta}>
          <View style={styles.pickupColumn}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Pickup Date:</Text>
              <Text style={styles.metaValue}>{packageData.pickupDate || 'N/A'}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Pickup Time:</Text>
              <Text style={styles.metaValue}>{packageData.pickupTime || 'N/A'}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Origin:</Text>
              <Text style={styles.metaValue}>{packageData.origin || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.deliveryColumn}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Delivery Date:</Text>
              <Text style={styles.metaValue}>{packageData.estimatedDeliveryDate || 'N/A'}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Courier:</Text>
              <Text style={styles.metaValue}>{packageData.courier || 'N/A'}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Destination:</Text>
              <Text style={styles.metaValue}>{packageData.destination || 'N/A'}</Text>
            </View>
          </View>
          {/* Carrier and Reference No. at the bottom of the right panel */}
          <View style={styles.carrierMetaContainer}>
            {packageData.carrierReferenceNo && (
              <View style={styles.carrierMetaRow}>
                <Text style={styles.carrierLabel}>Carrier:</Text>
                <Text style={styles.carrierValue}>{packageData.carrierReferenceNo}</Text>
              </View>
            )}
            <View style={styles.carrierMetaRow}>
              <Text style={styles.carrierLabel}>Departure Time:</Text>
              <Text style={styles.carrierValue}>{packageData.departureTime || 'N/A'}</Text>
            </View>
            <View style={styles.carrierMetaRow}>
              <Text style={styles.carrierLabel}>Reference No.:</Text>
              <Text style={styles.carrierValue}>{packageData.packageId || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Shipper and Consignee Section */}
      <View style={styles.partySection}>
        <View style={styles.partyColumn}>
          <Text style={[styles.cell, styles.partyTitleCell, styles.cellTopFirst, styles.cellFirst]}>Shipper</Text>
          <Text style={[styles.cell, styles.partyDetailCell, styles.cellFirst]}>{packageData?.senderName || ''}</Text>
          <Text style={[styles.cell, styles.addressCell, styles.cellFirst]}>{packageData?.senderAddress || ''}</Text>
          {packageData?.senderPhone && (
            <Text style={[styles.cell, styles.partyDetailCell, styles.cellFirst]}>
              {packageData.senderPhone}
            </Text>
          )}
          <Text style={[styles.cell, styles.partyDetailCell, styles.cellFirst]}>{packageData?.senderEmail || ''}</Text>
        </View>
        <View style={[styles.partyColumn, styles.partyColumnLast]}>
          <Text style={[styles.cell, styles.partyTitleCell, styles.cellTopFirst, styles.partyTitleCellRight]}>Consignee</Text>
          <Text style={[styles.cell, styles.partyDetailCell, styles.partyDetailCellRight]}>{packageData?.receiverName || ''}</Text>
          <Text style={[styles.cell, styles.addressCell, styles.addressCellRight]}>{packageData?.receiverAddress || ''}</Text>
          <Text style={[styles.cell, styles.partyDetailCell, styles.partyDetailCellRight]}>{packageData?.receiverPhone || ''}</Text>
          <View style={[styles.cell, styles.statusCommentCell, styles.statusCommentCellRight]}>
            <Text>Status: {packageData?.status || 'Order Placed'}</Text>
            <Text>Comment: {packageData?.comment || ''}</Text>
          </View>
        </View>
      </View>

      {/* Shipment Details Table */}
      <View style={styles.shipmentTable}>
        {/* Row 1: Type of Shipment */}
        <View style={styles.shipmentRow}>
          <Text style={[styles.cell, styles.shipmentCellLabel, styles.cellTopFirst, styles.cellFirst]}>Type of Shipment:</Text>
          <Text style={[styles.cell, styles.shipmentCellValueWide, styles.cellTopFirst]}>{packageData?.typeOfShipment|| ''}</Text>
        </View>
        {/* Row 2: Packages, Product */}
        <View style={styles.shipmentRow}>
          <Text style={[styles.cell, styles.shipmentCellLabel, styles.cellFirst]}>Packages:</Text>
          <Text style={[styles.cell, styles.shipmentCellValue]}>{packageData?.packageType || ''}</Text>
          <Text style={[styles.cell, styles.shipmentCellLabel]}>Product:</Text>
          <Text style={[styles.cell, styles.shipmentCellValue]}>{packageData?.product || ''}</Text>
        </View>
        {/* Row 3: Weight, Quantity */}
        <View style={styles.shipmentRow}>
          <Text style={[styles.cell, styles.shipmentCellLabel, styles.cellFirst]}>Weight:</Text>
          <Text style={[styles.cell, styles.shipmentCellValue]}>{packageData?.weight || ''}</Text>
          <Text style={[styles.cell, styles.shipmentCellLabel]}>Quantity:</Text>
          <Text style={[styles.cell, styles.shipmentCellValue]}>{packageData?.quantity || ''}</Text>
        </View>
        {/* Row 4: Total Freight, Mode */}
        <View style={styles.shipmentRow}>
          <Text style={[styles.cell, styles.shipmentCellLabel, styles.cellFirst]}>Total Freight:</Text>
          <Text style={[styles.cell, styles.shipmentCellValue]}>{packageData?.shippingCost || ''}</Text>
          <Text style={[styles.cell, styles.shipmentCellLabel]}>Mode:</Text>
          <Text style={[styles.cell, styles.shipmentCellValue]}>{packageData?.typeOfShipment || ''}</Text>
        </View>
        {/* Row 5: Payment Mode */}
        <View style={styles.shipmentRow}>
          <Text style={[styles.cell, styles.shipmentCellLabel, styles.cellFirst, styles.shipmentCellLastRow]}>Payment Mode:</Text>
          <Text style={[styles.cell, styles.shipmentCellValueWide, styles.shipmentCellLastRow]}>{packageData?.paymentMode || ''}</Text>
        </View>
      </View>

      {/* Footer Timestamp */}
      <Text style={styles.footerTimestamp} fixed>
        {packageData.documentTimestamp || ''}
      </Text>
    </View>
  );
};


// Main WaybillPdfDocument component that renders multiple copies
const WaybillPdfDocument = ({ packageData }) => (
  <Document>
    {/* Page 1: Accounts Copy and Consignee Copy */}
    <Page style={styles.page} size="A4">
      <WaybillSingleCopyLayout packageData={packageData} copyType="Accounts Copy" />
      <WaybillSingleCopyLayout packageData={packageData} copyType="Consignee Copy" />
    </Page>
    {/* Page 2: Shippers Copy */}
    <Page style={styles.page} size="A4">
      <WaybillSingleCopyLayout packageData={packageData} copyType="Shippers Copy" />
    </Page>
  </Document>
);

export default WaybillPdfDocument;



