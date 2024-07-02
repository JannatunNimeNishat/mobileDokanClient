import { Document, PDFDownloadLink, PDFViewer, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Modal } from "antd";


const InvoiceModalComponent = ({sellData,isInvoiceModalOpen,handleInvoiceModalCancel}:any) => {

    const generatePDF = () => (
      <Document>
        <Page style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.title}>Invoice</Text>
            <View style={styles.invoiceDetails}>
              <View style={{ flex: 1 }}>
                <Text>Invoice No: {sellData._id}</Text>
                <Text>Date: {new Date(sellData.createdAt).toLocaleDateString()}</Text>
              </View>
            </View>
            <View style={styles.billTo}>
              <Text>Bill To:</Text>
              <Text>{sellData.buyer_name}</Text>
              <Text>Address: 123 Street, City, Country</Text>
              <Text>Email: buyer@example.com</Text>
            </View>
            <Text style={styles.productsHeader}>Products:</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.description}>Product Name</Text>
                <Text style={styles.qty}>Quantity</Text>
                <Text style={styles.rate}>Rate</Text>
                <Text style={styles.amount}>Amount</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.description}>{sellData.productName}</Text>
                <Text style={styles.qty}>{sellData.quantity}</Text>
                <Text style={styles.rate}>${sellData.price}</Text>
                <Text style={styles.amount}>${sellData.price * sellData.quantity}</Text>
              </View>
            </View>
            <Text style={styles.thankYou}>Thank you for your purchase!</Text>
          </View>
        </Page>
      </Document>
    );
    
    const styles = StyleSheet.create({
      page: {
        padding: 20,
      },
      section: {
        marginBottom: 10,
      },
      title: {
        fontSize: 30,
        marginBottom: 20,
        marginTop:10,
        textAlign: "center",
        fontWeight:'bold'
      },
      invoiceDetails: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10,
        
      
      },
      billTo: {
        marginTop: 20,
        marginBottom: 20,
        fontWeight:'bold'
        
      },
      productsHeader: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 18,
      },
      table: {
        marginBottom: 10,
        borderColor:'black',
        border:1
      },
      tableRow: {
        flexDirection: "row",
        borderBottomColor: "black",
        borderTopColor:'black',
        borderBottomWidth: 1,
        alignItems: "center",
        height: 24,
        fontStyle: "bold",
        color: "black",
      },
      description: {
        width: "40%",
        borderRightColor: "black",
        borderRightWidth: 1,
        textAlign: "center",
      },
      qty: {
        width: "20%",
        borderRightColor: "black",
        borderRightWidth: 1,
        textAlign: "center",
      },
      rate: {
        width: "20%",
        borderRightColor: "black",
        borderRightWidth: 1,
        textAlign: "center",
      },
      amount: {
        width: "20%",
        textAlign: "center",
      },
      thankYou: {
        marginTop: 20,
        fontSize: 16,
        textAlign: "center",
      },
    });
    
  
    return (
      <>
        <Modal
          title="Invoice"
          
          visible={isInvoiceModalOpen}
          onCancel={handleInvoiceModalCancel}
          footer={false}
        >
          <PDFViewer width="100%" height="400px">
            {generatePDF()}
          </PDFViewer>
          <PDFDownloadLink
            document={generatePDF()}
            fileName={`invoice_${sellData._id}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download Invoice"
            }
          </PDFDownloadLink>
        </Modal>
      </>
    );
};

export default InvoiceModalComponent;