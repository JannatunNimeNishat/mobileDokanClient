import { Button, Modal, Table } from "antd";
import { useAllSalesQuery } from "../../redux/features/sale/saleApi";
import { useState } from "react";
import moment from "moment";
import { EyeOutlined } from "@ant-design/icons";
import ReactPDF, {
  Document,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import InvoiceModalComponent from "../../components/modal/InvoiceModalComponent";
const SaleHistory = () => {
  const [interval, setInterval] = useState("daily");
  const {
    data: allSales,
    isLoading: isSaleDataLoading,
    isFetching,
  } = useAllSalesQuery(interval);

  const handleIntervalClick = (newInterval: string) => {
    setInterval(newInterval);
  };

  const tableData = allSales?.data?.map(
    ({
      _id,
      imageURL,
      productName,
      createdAt,
      price,
      buyer_name,
      quantity,
    }:any) => ({
      key: _id,
      imageURL,
      productName,
      createdAt,
      price,
      buyer_name,
      quantity,
    })
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "imageURL",
      render: (imageURL: string) => (
        <img
          src={imageURL}
          style={{ width: "50px", height: "50px" }}
          alt="Product"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "productName",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Buyer name",
      dataIndex: "buyer_name",
    },
    {
      title: "Invoice",
      key: "x",
      render: (item:any) => {
        return <InvoiceModal sellData={item} />;
      },
    },
  ];

  return (
    <div>
      {/* sort by */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <p>Sort by:</p>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <Button
            type={interval === "daily" ? "primary" : "default"}
            onClick={() => {
              handleIntervalClick("daily");
            }}
          >
            Daily
          </Button>
          <Button
            type={interval === "weekly" ? "primary" : "default"}
            onClick={() => {
              handleIntervalClick("weekly");
            }}
          >
            Weekly
          </Button>
          <Button
            type={interval === "monthly" ? "primary" : "default"}
            onClick={() => {
              handleIntervalClick("monthly");
            }}
          >
            Monthly
          </Button>
          <Button
            type={interval === "yearly" ? "primary" : "default"}
            onClick={() => {
              handleIntervalClick("yearly");
            }}
          >
            Yearly
          </Button>
        </div>
      </div>
      {/* table */}
      <div style={{ marginTop: "15px" }}>
        <Table
          loading={isFetching}
          size={"middle"}
          columns={columns}
          // dataSource={allSales?.data}
          dataSource={tableData}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default SaleHistory;

const InvoiceModal = ({ sellData }:any) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const generatePDF = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Invoice</Text>
          <View style={styles.invoiceDetails}>
            <View style={{ flex: 1 }}>
              <Text>Invoice No: {sellData.key}</Text>
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
      <Button type="text" onClick={showModal}>
        <EyeOutlined />
      </Button>
      <Modal
        title="Invoice"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <PDFViewer width="100%" height="400px">
          {generatePDF()}
        </PDFViewer>
        <PDFDownloadLink
          document={generatePDF()}
          fileName={`invoice_${sellData.key}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download Invoice"
          }
        </PDFDownloadLink>
      </Modal>
    </>
  );
};
