import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import JsBarcode from 'jsbarcode';

// Register the font. Ensure 'bold' variant is also registered for correct rendering.
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN_r8cr_g.ttf', fontWeight: 'bold' },
  ],
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
    alignItems: 'flex-start',
  },
  companyInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  companyLogo: {
    width: 150,
    height: 50,
    marginBottom: 5,
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
    color: '#0000EE',
    textDecoration: 'underline',
    marginTop: 2,
  },
  barcodeContainer: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  barcodeImage: {
    width: 250,
    height: 70,
  },
  packageId: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },

  // General Details Section (for Shipper, Receiver, Tracking Summary)
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
    lineHeight: 1.2,
    marginBottom: 2,
  },

  // Specific styles for Tracking Summary
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    flexWrap: 'wrap', // Allows items to wrap to the next line if space is limited
  },
  summaryItem: {
    fontSize: 9,
    marginBottom: 2,
    flexBasis: '48%', // Roughly half width for two items per row
  },

  // Table styles for Tracking History
  trackingTable: {
    display: 'table',
    width: 'auto',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    borderTopWidth: 1,
  },
  tableCell: {
    borderWidth: 1,
    borderColor: '#000',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    padding: 5,
    fontSize: 8, // Slightly smaller font for table readability
    textAlign: 'left',
  },
  tableCellFirst: {
    borderLeftWidth: 1,
  },
  timestampCell: { width: '25%' },
  statusCell: { width: '20%' },
  locationCell: { width: '25%' },
  noteCell: { width: '30%' },
});

// Function to generate barcode SVG as a data URL (reused from your code)
const generateBarcodeDataURL = (value) => {
  if (!value) return '';
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    console.warn("Canvas not available for barcode generation in this environment.");
    return '';
  }
  try {
    JsBarcode(canvas, value, {
      format: 'CODE128',
      displayValue: false,
      width: 2,
      height: 70,
      margin: 0,
    });
    return canvas.toDataURL('image/png');
  } catch (e) {
    console.error("Error generating barcode:", e);
    return '';
  }
};

const TrackingInvoicePdfDocument = ({ packageData }) => {
  const data = packageData || {};
  const barcodeDataUrl = generateBarcodeDataURL(data.packageId);

  // Filter out invalid tracking history entries for display
  const validTrackingHistory = (data.trackingHistory || []).filter(entry =>
    entry && (entry.timestamp || entry.status || entry.location || entry.note)
  );

  return (
    <Document>
      <Page style={styles.page} size="A4">
        {/* Header Section (reused from your existing invoice) */}
        <View style={styles.headerSection}>
          <View style={styles.companyInfo}>
            <Image style={styles.companyLogo} src="https://expresslanelogs.com/wp-content/uploads/2025/04/Express-Logo-184x66.png" />
            <Text style={styles.companyName}>Express Lane Logistics</Text>
            <Text style={styles.companyDetails}>Logistics and Shipping Company</Text>
            <Text style={styles.companyWebsite}>https://expresslanelogs.com</Text>
          </View>

          <View style={styles.barcodeContainer}>
            {barcodeDataUrl && (
              <Image style={styles.barcodeImage} src={barcodeDataUrl} />
            )}
            {data.packageId && (
              <Text style={styles.packageId}>Tracking ID: {data.packageId}</Text>
            )}
          </View>
        </View>

        {/* Tracking Summary Section */}
        {(data.currentStatus || data.origin || data.destination || data.pickupDate || data.estimatedDeliveryDate || data.courier || data.typeOfShipment || data.carrierReferenceNo) && (
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>TRACKING SUMMARY:</Text>
            <View style={styles.summaryRow}>
              {data.currentStatus && (
                <Text style={styles.summaryItem}><Text style={styles.detailLabel}>Current Status: </Text>{data.currentStatus}</Text>
              )}
              {data.origin && (
                <Text style={styles.summaryItem}><Text style={styles.detailLabel}>Origin: </Text>{data.origin}</Text>
              )}
              {data.destination && (
                <Text style={styles.summaryItem}><Text style={styles.detailLabel}>Destination: </Text>{data.destination}</Text>
              )}
              {data.pickupDate && data.pickupTime && (
                 <Text style={styles.summaryItem}><Text style={styles.detailLabel}>Pickup Date/Time: </Text>{data.pickupDate} at {data.pickupTime}</Text>
              )}
              {data.estimatedDeliveryDate && (
                <Text style={styles.summaryItem}><Text style={styles.detailLabel}>Estimated Delivery Date: </Text>{data.estimatedDeliveryDate}</Text>
              )}
              {data.departureTime && (
                 <Text style={styles.summaryItem}><Text style={styles.detailLabel}>Departure Time: </Text>{data.departureTime}</Text>
              )}
              {data.courier && (
                <Text style={styles.summaryItem}><Text style={styles.detailLabel}>Courier: </Text>{data.courier}</Text>
              )}
              {data.typeOfShipment && (
                <Text style={styles.summaryItem}><Text style={styles.detailLabel}>Shipment Type: </Text>{data.typeOfShipment}</Text>
              )}
              {data.carrierReferenceNo && (
                <Text style={styles.summaryItem}><Text style={styles.detailLabel}>Carrier Reference No: </Text>{data.carrierReferenceNo}</Text>
              )}
            </View>
          </View>
        )}

        {/* Tracking History Section */}
        {validTrackingHistory.length > 0 && (
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>TRACKING HISTORY:</Text>
            <View style={styles.trackingTable}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell, styles.tableCellFirst, styles.timestampCell]}>Timestamp</Text>
                <Text style={[styles.tableCell, styles.statusCell]}>Status</Text>
                <Text style={[styles.tableCell, styles.locationCell]}>Location</Text>
                <Text style={[styles.tableCell, styles.noteCell]}>Note</Text>
              </View>

              {/* Mapped Tracking History Entries */}
              {validTrackingHistory.map((entry, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={[styles.tableCell, styles.tableCellFirst, styles.timestampCell]}>{entry.timestamp ? new Date(entry.timestamp).toLocaleString() : 'N/A'}</Text>
                  <Text style={[styles.tableCell, styles.statusCell]}>{entry.status || 'N/A'}</Text>
                  <Text style={[styles.tableCell, styles.locationCell]}>{entry.location || 'N/A'}</Text>
                  <Text style={[styles.tableCell, styles.noteCell]}>{entry.note || 'No additional notes'}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* General Comments (if any) */}
        {data.comments && (
            <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>ADDITIONAL COMMENTS:</Text>
                <Text style={styles.detailItem}>{data.comments}</Text>
            </View>
        )}

        {/* This section (Shipper/Receiver Details, Package Details, Weight Summary) 
            is typically part of a full invoice. For a dedicated tracking document, 
            it might be omitted or included based on specific needs. 
            I've removed it for clarity in a "Tracking" document.
        */}
      </Page>
    </Document>
  );
};

export default TrackingInvoicePdfDocument;