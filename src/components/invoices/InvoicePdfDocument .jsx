import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import JsBarcode from 'jsbarcode'; // Import JsBarcode for barcode generation
import companyLogo from '../../assets/expresslano.png'; // Adjust the path as necessary

// Register a font for the PDF. Open Sans is a good alternative for Arial.
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf'
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Open Sans',
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 30,
    fontSize: 9,
    lineHeight: 1.5,
  },
  // Top Header Section (Company Logo, Waybill ID, Barcode)
  headerSection: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'flex-start', // Align content to the start
  },
  companyInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5, // Reduced margin
  },
  companyLogo: {
    width: 120, // Adjusted width to match the image
    height: 150, // Adjusted height to match the image
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  companyDetails: {
    fontSize: 9,
    marginBottom: 2,
  },
  companyWebsite: {
    fontSize: 8,
    color: '#0000EE', // Standard blue for links
    textDecoration: 'underline',
    marginTop: 2,
  },
  barcodeContainer: {
    alignSelf: 'center', // Center the barcode container horizontally
    marginBottom: 10,
    marginTop: 10, // Add some space above the barcode
  },
  barcodeImage: {
    width: 250, // Adjusted width for better barcode visibility
    height: 70, // Adjusted height for better barcode visibility
  },
  packageId: {
    fontSize: 14, // Slightly larger for prominence
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center', // Center the text below the barcode
  },

  // Shipper/Receiver Details Section
  detailsSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  detailItem: {
    fontSize: 9,
    marginBottom: 2,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 9,
    lineHeight: 1.2, // Tighter line height for address
    marginBottom: 2,
  },

  // Package Details Table
  packageTable: {
    display: 'table',
    width: 'auto',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    borderWidth: 1,
    borderColor: '#000',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    padding: 5,
    fontSize: 9,
    textAlign: 'left',
  },
  tableCellFirst: {
    borderLeftWidth: 1,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    borderTopWidth: 1, // Header needs a top border
  },
  // Specific width for Qty cell to match image
  qtyCell: {
    width: '10%', // Adjusted width
    textAlign: 'center',
  },
  // Specific width for Piece Type cell
  pieceTypeCell: {
    width: '20%', // Adjusted width
  },
  // Specific width for Description cell
  descriptionCell: {
    width: '70%', // Takes up remaining space
  },
  // Table cells for dimensions/weight, spanning two columns for label, one for value
  dimensionLabelCell: {
    width: '50%',
    borderLeftWidth: 1,
  },
  dimensionValueCell: {
    width: '50%',
  },
  // Additional styles for package item details
  packageItemDetails: {
    backgroundColor: '#f9f9f9',
    fontSize: 8,
  },
  dimensionRow: {
    backgroundColor: '#f9f9f9',
  },

  // Volumetric/Actual Weight Section
  weightSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 5,
  },
  weightText: {
    fontSize: 9,
    fontWeight: 'extrabold',
    flexBasis: '33%', // Distribute evenly
    textAlign: 'left', // Align to left within its flex basis
  },
});

// Function to generate barcode SVG as a data URL
const generateBarcodeDataURL = (value) => {
  if (!value) return '';
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null; // Check if document is defined
  if (!canvas) {
    console.warn("Canvas not available for barcode generation in this environment.");
    return '';
  }
  try {
    JsBarcode(canvas, value, {
      format: 'CODE128',
      displayValue: false,
      width: 2,
      height: 70, // Matched height with barcodeImage style
      margin: 0,
    });
    return canvas.toDataURL('image/png');
  } catch (e) {
    console.error("Error generating barcode:", e);
    return '';
  }
};

const InvoicePdfDocument = ({ packageData }) => {
  console.log(packageData)
  // Ensure packageData is not null or undefined
  const data = packageData || {};
  const barcodeDataUrl = generateBarcodeDataURL(data.packageId);

  // Calculate totals from all package items
  const calculateTotals = () => {
    if (!data.packageItems || data.packageItems.length === 0) {
      return {
        totalVolumetricWeight: data.totalVolumetricWeight || data.weight || '0',
        totalVolume: data.totalVolume || '0',
        totalActualWeight: data.totalActualWeight || '0'
      };
    }

    let totalWeight = 0;
    let totalVolume = 0;

    data.packageItems.forEach(item => {
      if (item.weightKg) {
        totalWeight += parseFloat(item.weightKg) || 0;
      }
      if (item.lengthCm && item.widthCm && item.heightCm) {
        const volume = (parseFloat(item.lengthCm) * parseFloat(item.widthCm) * parseFloat(item.heightCm)) / 1000000; // Convert to cubic meters
        totalVolume += volume;
      }
    });

    return {
      totalVolumetricWeight: data.totalVolumetricWeight || data.weight || totalWeight.toFixed(2) + ' kg',
      totalVolume: data.totalVolume || totalVolume.toFixed(2) + ' cu. m.',
      totalActualWeight: data.totalActualWeight || totalWeight.toFixed(2) + ' kg'
    };
  };

  const totals = calculateTotals();

  return (
    <Document>
      <Page style={styles.page} size="A4">
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.companyInfo}>
            {/* Logo from the provided URL */}
            <Image style={styles.companyLogo} src={companyLogo} />
            <Text style={styles.companyWebsite}>https://expresslano.com</Text>
          </View>

          <View style={styles.barcodeContainer}>
            {barcodeDataUrl && (
              <Image style={styles.barcodeImage} src={barcodeDataUrl} />
            )}
            {data.packageId && (
              <Text style={styles.packageId}>{data.packageId}</Text>
            )}
          </View>
        </View>

        {/* Shipper Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>SHIPPER DETAILS:</Text>
          {data.senderName && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Shipper Name: </Text>{data.senderName}</Text>
          )}
          {data.senderPhone && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Phone Number: </Text>{data.senderPhone}</Text>
          )}
          {data.senderAddress && (
            <Text style={styles.addressText}>
              <Text style={styles.detailLabel}>Address: </Text>
              {data.senderAddress}
            </Text>
          )}
          {data.senderEmail && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Email: </Text>{data.senderEmail}</Text>
          )}
        </View>

        {/* Receiver Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>RECEIVER DETAILS:</Text>
          {data.receiverName && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Receiver Name: </Text>{data.receiverName}</Text>
          )}
          {data.receiverPhone && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Phone Number: </Text>{data.receiverPhone}</Text>
          )}
          {data.receiverAddress && (
            <Text style={styles.addressText}>
              <Text style={styles.detailLabel}>Address: </Text>
              {data.receiverAddress}
            </Text>
          )}
          {data.receiverEmail && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Email: </Text>{data.receiverEmail}</Text>
          )}
        </View>

        {/* Package Details Table */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>PACKAGE DETAILS:</Text>
          <View style={styles.packageTable}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableCellFirst, styles.qtyCell]}>Qty.</Text>
              <Text style={[styles.tableCell, styles.pieceTypeCell]}>Piece Type</Text>
              <Text style={[styles.tableCell, styles.descriptionCell]}>Description</Text>
            </View>
            
            {/* Map through all package items */}
            {data.packageItems && data.packageItems.length > 0 ? (
              data.packageItems.map((item, index) => (
                <React.Fragment key={index}>
                  {/* Main item row */}
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.tableCellFirst, styles.qtyCell]}>{item.qty || '1'}</Text>
                    <Text style={[styles.tableCell, styles.pieceTypeCell]}>{item.pieceType || data.product || 'N/A'}</Text>
                    <Text style={[styles.tableCell, styles.descriptionCell]}>{item.description || data.itemDetails?.description || 'N/A'}</Text>
                  </View>
                  
                  {/* Dimensions and weight rows for this item */}
                  {item.lengthCm && (
                    <View style={[styles.tableRow, styles.dimensionRow]}>
                      <Text style={[styles.tableCell, styles.tableCellFirst, styles.dimensionLabelCell, styles.packageItemDetails]}>
                        <Text style={styles.detailLabel}>Length (cm)</Text>
                      </Text>
                      <Text style={[styles.tableCell, styles.dimensionValueCell, styles.packageItemDetails]}>{item.lengthCm}</Text>
                    </View>
                  )}
                  {item.widthCm && (
                    <View style={[styles.tableRow, styles.dimensionRow]}>
                      <Text style={[styles.tableCell, styles.tableCellFirst, styles.dimensionLabelCell, styles.packageItemDetails]}>
                        <Text style={styles.detailLabel}>Width (cm)</Text>
                      </Text>
                      <Text style={[styles.tableCell, styles.dimensionValueCell, styles.packageItemDetails]}>{item.widthCm}</Text>
                    </View>
                  )}
                  {item.heightCm && (
                    <View style={[styles.tableRow, styles.dimensionRow]}>
                      <Text style={[styles.tableCell, styles.tableCellFirst, styles.dimensionLabelCell, styles.packageItemDetails]}>
                        <Text style={styles.detailLabel}>Height (cm)</Text>
                      </Text>
                      <Text style={[styles.tableCell, styles.dimensionValueCell, styles.packageItemDetails]}>{item.heightCm}</Text>
                    </View>
                  )}
                  {item.weightKg && (
                    <View style={[styles.tableRow, styles.dimensionRow]}>
                      <Text style={[styles.tableCell, styles.tableCellFirst, styles.dimensionLabelCell, styles.packageItemDetails]}>
                        <Text style={styles.detailLabel}>Weight (kg)</Text>
                      </Text>
                      <Text style={[styles.tableCell, styles.dimensionValueCell, styles.packageItemDetails]}>{item.weightKg}</Text>
                    </View>
                  )}
                </React.Fragment>
              ))
            ) : (
              // Fallback if no package items exist
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableCellFirst, styles.qtyCell]}>{data.quantity || '1'}</Text>
                <Text style={[styles.tableCell, styles.pieceTypeCell]}>{data.product || data.packageType || 'N/A'}</Text>
                <Text style={[styles.tableCell, styles.descriptionCell]}>{data.itemDetails?.description || 'N/A'}</Text>
              </View>
            )}
          </View>
        </View>


        {/* Additional shipping information */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>SHIPPING INFORMATION:</Text>
          {data.typeOfShipment && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Type of Shipment: </Text>{data.typeOfShipment}</Text>
          )}
          {data.courier && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Courier: </Text>{data.courier}</Text>
          )}
          {data.origin && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Origin: </Text>{data.origin}</Text>
          )}
          {data.destination && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Destination: </Text>{data.destination}</Text>
          )}
          {data.currentStatus && (
            <Text style={styles.detailItem}><Text style={styles.detailLabel}>Current Status: </Text>{data.currentStatus}</Text>
          )}
        </View>

        {/* Total Weight Summary */}
        <View style={styles.weightSummary}>
          <Text style={styles.weightText}>Total Volumetric Weight: {totals.totalVolumetricWeight}</Text>
          <Text style={styles.weightText}>Total Volume: {totals.totalVolume}</Text>
          <Text style={styles.weightText}>Total Actual Weight: {totals.totalActualWeight}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePdfDocument;