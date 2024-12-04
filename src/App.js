import React, { useState } from "react";
import jsPDF from "jspdf";
import headerImage from "./Assets/Header.png"; // Import header image
import footerImage from "./Assets/Footer.png"; // Import footer image
import html2canvas from "html2canvas";
import moment from "moment";
import { Checkbox, FormControlLabel, Grid2, TextField } from "@mui/material";
import IndianOfferLetter from "./IndianOfferLetter";
import UsofferLetter from "./UsofferLetter";
import numberToText from "number2text";
function App() {
  // const [country, setCountry] = useState("India");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    hra: "",
    salary: "",
    employeeName: "",
    employeeBasicPay: "",
    empDesignation: "",
    hrName: "",
    hrDesignation: "",
    jobTitle: "",
    reportingManager: "",
    reportingManagerJobTitle: "",
    joiningDate: "",
    expiryDate: "",
    annualSalary: 0,
    formattedAnnualSalary: 0,
    annualSalaryInWords: "",
    gbInWords: "",
    bonus: 0,
    showBonus: false,
    showJoiningBonus: false,
    insurance: 0,
    country: "India",
    gb: 0,
    fb: 0,
    pf: 0,
    annualGrossSalary: 0,
    companyLogo: null,
    signature: null,
  });
  const data = {
    components: [
      {
        name: "Basic",
        monthly: (formData.employeeBasicPay / 12).toFixed(2),
        annual: formData.employeeBasicPay,
      },
      {
        name: "HRA",
        monthly: (formData.hra / 12).toFixed(2),
        annual: formData.hra,
      },
      {
        name: "Flexible Pay",
        monthly: (
          (formData.annualSalary -
            formData.hra -
            formData.insurance -
            formData.gb -
            formData.fb -
            formData.pf -
            formData.employeeBasicPay) /
          12
        ).toFixed(2),
        annual:
          formData.annualSalary -
          formData.hra -
          formData.insurance -
          formData.gb -
          formData.fb -
          formData.pf -
          formData.employeeBasicPay,
      },
    ],
    totalFixedPay: {
      monthly: (
        (formData.hra +
          formData.employeeBasicPay +
          (formData.annualSalary -
            formData.hra -
            formData.insurance -
            formData.gb -
            formData.fb -
            formData.pf -
            formData.employeeBasicPay)) /
        12
      ).toFixed(2),
      annual:
        formData.hra +
        formData.employeeBasicPay +
        (formData.annualSalary -
          formData.hra -
          formData.insurance -
          formData.gb -
          formData.fb -
          formData.pf -
          formData.employeeBasicPay),
    },
    benefits: [
      { name: "Employer's PF", monthly: 0, annual: formData.pf },
      {
        name: "Insurance Benefit",
        monthly: 0,
        annual: formData.insurance,
      },
      {
        name: "Gratuity",
        monthly: 0,
        annual: parseInt((formData.employeeBasicPay * 4.81) / 100).toFixed(2),
      },
    ],
    totalBenefits: {
      monthly: 0,
      annual: (
        parseInt(formData.pf) +
        parseInt(formData.insurance) +
        parseInt(formData.employeeBasicPay * 4.81)
      ).toFixed(2),
      //   formData.pf + formData.insurance
      // ).toFixed(2),
    },
    totalCost: {
      monthly: 0,
      annual:
        formData.hra +
        formData.employeeBasicPay +
        (formData.annualSalary -
          formData.hra -
          formData.insurance -
          formData.gb -
          formData.fb -
          formData.pf -
          formData.employeeBasicPay) +
        parseInt(formData.pf) +
        parseInt(formData.insurance) +
        parseInt(formData.employeeBasicPay * 4.81),
    },
    GuaranteedBonus: {
      monthly:
        parseInt(formData.pf) / 12 +
        formData.insurance / 12 +
        (formData.employeeBasicPay * 4.81) / 12,
      annual:
        formData.pf + formData.insurance + formData.employeeBasicPay * 4.81,
    },
    JoiningBonus: {
      monthly:
        formData.pf / 12 +
        formData.insurance / 12 +
        (formData.employeeBasicPay * 4.81) / 12,
      annual:
        formData.pf + formData.insurance + formData.employeeBasicPay * 4.81,
    },
  };
  function numberToWords(num) {
    if (num === 0) return "zero";

    const singleDigits = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const higherUnits = ["", "Thousand", "Lakh", "Crore"];

    const getBelowThousand = (n) => {
      let result = "";

      if (n > 99) {
        result += singleDigits[Math.floor(n / 100)] + " hundred ";
        n %= 100;
      }

      if (n >= 10 && n <= 19) {
        result += teens[n - 10] + " ";
      } else if (n >= 20) {
        result += tens[Math.floor(n / 10)] + " ";
        n %= 10;
      }

      if (n > 0) {
        result += singleDigits[n] + " ";
      }

      return result.trim();
    };

    let result = "";
    let unitIndex = 0;

    // Only process numbers above zero
    while (num > 0) {
      const divisor = unitIndex === 1 ? 1000 : 100; // Adjust for 'thousand' group

      const part = num % divisor;

      // Process if part is non-zero
      if (part !== 0) {
        const partInWords = getBelowThousand(part);

        // Add the corresponding higher unit only if the number is greater than 0
        if (higherUnits[unitIndex]) {
          result = partInWords + " " + higherUnits[unitIndex] + " " + result;
        } else {
          result = partInWords + " " + result;
        }
      }

      // Update num and increment unitIndex
      num = Math.floor(num / divisor);
      unitIndex++;
    }
    console.log(result);
    return result.trim();
  }
  const handleDownload = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210; // A4 width
    const pageHeight = 297; // A4 height
    const headerHeight = 30;
    const footerHeight = 20;
    const contentHeight = pageHeight - headerHeight - footerHeight;

    const addPageContent = async (elementId, yOffset = headerHeight) => {
      const element = document.getElementById(elementId);

      const canvas = await html2canvas(element, { scale: 1, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(headerImage, "PNG", 0, 0, pageWidth, headerHeight);

      pdf.addImage(
        imgData,
        "PNG",
        0,
        yOffset,
        pageWidth,
        Math.min(contentHeight, imgHeight)
      );

      pdf.addImage(
        footerImage,
        "PNG",
        0,
        pageHeight - footerHeight,
        pageWidth,
        footerHeight
      );
    };

    await addPageContent("page-1");

    pdf.addPage();
    await addPageContent("page-2");
    pdf.addPage();
    await addPageContent("page-3");
    pdf.addPage();
    await addPageContent("page-4");
    pdf.addPage();
    await addPageContent("page-5");

    pdf.save("pageletter.pdf");
  };
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    console.log(name, value, type, files, checked);
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]:
          type === "file" ? files[0] : type === "checkbox" ? value : value,
      };
       let parsedValue = parseInt(value.replace(/,/g, ""), 10);
      if (name === "gb") {
        updatedData.gbInWords = numberToText(
          parsedValue,
          formData.country === "India" ? "Indian" : "English"
        );
      }
      if (name === "annualSalary") {
        function formatIndianNumberingSystem(number) {
          return number.toLocaleString(
            formData.country === "India" ? "en-IN" : "en-US"
          );
        }

        // Parse the value to a number (if it's not empty or invalid)
       

        if (!isNaN(parsedValue)) {
          let formattedNumber = formatIndianNumberingSystem(parsedValue);
         
          updatedData.annualSalary = parsedValue;
          updatedData.formattedAnnualSalary = formattedNumber;
          updatedData.annualSalaryInWords = numberToText(
            parsedValue,
            formData.country === "India" ? "Indian" : "English"
          );
        } else {
          updatedData.annualSalary = "";
        }
      }
      console.log(updatedData);

      if (["annualSalary", "insurance", "gb", "fb", "pf"].includes(name)) {
        const annualDeductions =
          parseFloat(updatedData.insurance || 0) +
          parseFloat(updatedData.gb || 0) +
          parseFloat(updatedData.fb || 0) +
          parseFloat(updatedData.pf || 0);
        const basicPay =
          (parseFloat(updatedData.annualSalary || 0) - annualDeductions) * 0.4;
        const hra = basicPay / 2;

        updatedData.employeeBasicPay = basicPay;
        updatedData.hra = hra;
      }

      return updatedData;
    });
  };
  const generateOfferLetter = () => {
    console.log("Form data submitted:", formData);
    console.log("Derived data for table:", data);
    // Add your logic to generate the offer letter here
  };
  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h1>Offer Letter Generator</h1>

      <form>
        {/* First Name */}
        <Grid2 container spacing={3}>
          {/* Row 1 */}
          <Grid2 container spacing={3}>
            <Grid2 item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="country"
                    onChange={handleChange}
                    value="India"
                    checked={formData.country === "India"}
                  />
                }
                label="Indian Offer Letter"
              />
            </Grid2>
            <Grid2 item xs={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="country"
                    onChange={handleChange}
                    value="USA"
                    checked={formData.country === "USA"}
                  />
                }
                label="USA Offer Letter"
              />
            </Grid2>
          </Grid2>

          {/* Row 2 */}
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 item size={3}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid2>
            <Grid2 item size={3}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid2>
            <Grid2 item xs={3}>
              <TextField
                fullWidth
                label="Candidate Designation"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid2>
            <Grid2 item xs={2}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid2>
            <Grid2 item xs={2}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2
          container
          rowSpacing={1}
          mt={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="Hr Name"
              name="hrName"
              value={formData.hrName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid2>
          {/* HR Designation */}
          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="HR Designation"
              name="hrDesignation"
              value={formData.hrDesignation}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid2>

          {/* Job Title */}

          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="Reporting Manager"
              name="reportingManager"
              value={formData.reportingManager}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="Reporting Manager Deisgnation"
              name="reportingManagerJobTitle"
              value={formData.reportingManagerJobTitle}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid2>
        </Grid2>
        {/* Date of Joining */}

        <Grid2 container mt={2} spacing={2}>
          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="Annual Salary"
              name="annualSalary"
              type="Number"
              value={formData.annualSalary}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="Insurance"
              name="insurance"
              type="Number"
              value={formData.insurance}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid2>

          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="PF"
              name="pf"
              type="Number"
              value={formData.pf}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="Guaranteed Bonus"
              name="gb"
              type="Number"
              value={formData.gb}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="Joining Bonus"
              name="fb"
              type="Number"
              value={formData.fb}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="Basic Pay Amount"
              name="employeeBasicPay"
              type="Number"
              value={
                (formData.annualSalary -
                  formData.insurance -
                  formData.gb -
                  formData.fb -
                  formData.pf) *
                0.4
              }
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="HRA"
              name="hra"
              type="Number"
              value={
                ((formData.annualSalary -
                  formData.insurance -
                  formData.gb -
                  formData.fb -
                  formData.pf) *
                  0.4) /
                2
              }
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid2>

          <Grid2 item xs={4}>
            <TextField
              fullWidth
              label="Upload Signature (Optional)"
              name="signature"
              type="file"
              accept="image/*"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="showBonus"
                  onChange={handleChange}
                  checked={formData.showBonus}
                />
              }
              label="Show Bonus"
            />
          </Grid2>
          <Grid2 item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="showJoiningBonus"
                  onChange={handleChange}
                  checked={formData.showJoiningBonus}
                />
              }
              label="Show Joining Bonus"
            />
          </Grid2>
        </Grid2>
        {/* <button type="button" onClick={generateOfferLetter}>
          Generate Offer Letter
        </button> */}
      </form>

      {formData.country === "India" && <UsofferLetter formData={formData} />}
      {formData.country === "USA" && <IndianOfferLetter formData={formData} />}
      {/* Page 1 Content */}
    </div>
  );
}

export default App;
const styles = {
  th: {
    textAlign: "left",
    padding: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  td: {
    textAlign: "left",
    padding: "8px",
    border: "1px solid #ddd",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },
};
