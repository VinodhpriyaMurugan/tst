import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import headerImage from "./Assets/Header.png"; // Import header image
import footerImage from "./Assets/Footer.png"; // Import footer image
import html2canvas from "html2canvas";
import moment from "moment";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Grid2,
  TextField,
} from "@mui/material";
import IndianOfferLetter from "./IndianOfferLetter";
import UsofferLetter from "./UsofferLetter";
import numberToText from "number2text";
import NzOfferLetter from "./NzOfferLetter";
function App() {
  // const [country, setCountry] = useState("India");
  const [formData, setFormData] = useState({
    selectedOption: null,
    performanceBonusDesc:
      "You will be subjected to the Annual Performance Review of the respective year. Your career and compensation progression will be based on your performance and Company policies prevailing at that point of time. ",
    joiningBonusDesc: `The amount will be recoverable from you in full, in the unlikely event of separation within 24 months of joining.`,
    guaranteedBonusDesc:
      " Guaranteed Bonuses are eligible to be paid subject to the employee being a full time India employee (and not serving notice period or on probation) at the time of payment.",
    incentiveDesc: "Incentive description",
    relocationDesc: "Relocation description",
    firstName: "",
    lastName: "",
    position: "",
    hra: 0,
    salary: 0,
    employeeName: "",
    employeeBasicPay: 0,
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
    fbInWords:'',
    bonus: 0,
    showBonus: false,
    showJoiningBonus: false,
    showPb: false,
    showIncentive: false,
    showRelocation: false,
    insurance: 0,
    incentive: 0,
    country: "India",
    gb: 0,
    fb: 0,
    performanceBonus: 0,
    relocation: 0,
    pf: 0,
    annualGrossSalary: 0,
    companyLogo: null,
    signature: null,
  });
  const calculateAnnualGrossSalary = () => {
    return (
      formData.annualSalary -
      formData.insurance -
      formData.gb -
      formData.fb -
      formData.pf
    );
  };
  const handleOptionChange = (option) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        selectedOption: prevState.selectedOption === option ? null : option,
      };
    });
  };

  const handleChangeDesc = (e) => {
    const { name, value } = e.target;
    console.log("name & Value", name, value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (field) => {
    console.log("Description", formData[field]);
    setFormData((prevData) => {
      let updatedData = {
        ...prevData,
        [field]: formData[field],
      };
      console.log("Updated data", updatedData);
      return updatedData;
    });

    // alert(`${field} saved: ${formData[field]}`);
  };
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      annualGrossSalary: calculateAnnualGrossSalary(),
    }));
  }, [
    formData.annualSalary,
    formData.insurance,
    formData.gb,
    formData.fb,
    formData.pf,
  ]);
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
          (parseInt(formData.annualSalary) -
            parseInt(formData.hra) -
            parseInt(formData.insurance) -
            parseInt(formData.gb) -
            parseInt(formData.fb) -
            parseInt(formData.pf) -
            parseInt(formData.performanceBonus) -
            parseInt(formData.incentive) -
            parseInt(formData.relocation) -
            parseInt(formData.employeeBasicPay)) /
          12
        ).toFixed(2),
        annual:
          parseInt(formData.annualSalary) -
          parseInt(formData.hra) -
          parseInt(formData.insurance) -
          parseInt(formData.gb) -
          parseInt(formData.fb) -
          parseInt(formData.pf) -
          parseInt(formData.performanceBonus) -
          parseInt(formData.incentive) -
          parseInt(formData.relocation) -
          parseInt(formData.employeeBasicPay),
      },
    ],
    totalFixedPay: {
      monthly: (
        parseInt(formData.hra) +
        parseInt(formData.employeeBasicPay) +
        (parseInt(formData.annualSalary) -
          parseInt(formData.hra) -
          parseInt(formData.insurance) -
          parseInt(formData.gb) -
          parseInt(formData.fb) -
          parseInt(formData.pf) -
          parseInt(formData.employeeBasicPay)) /
          12
      ).toFixed(2),
      annual:
        parseInt(formData.hra) +
        parseInt(formData.employeeBasicPay) +
        (parseInt(formData.annualSalary) -
          parseInt(formData.hra) -
          parseInt(formData.insurance) -
          parseInt(formData.gb) -
          parseInt(formData.fb) -
          parseInt(formData.pf) -
          parseInt(formData.employeeBasicPay)),
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
      let updatedData = {
        ...prevData,
        [name]:
          type === "file"
            ? files[0]
            : type === "checkbox"
            ? name === "country"
              ? value
              : checked
            : value,
      };
      if (
        [
          "showBonus",
          "showJoiningBonus",
          "showPb",
          "showIncentive",
          "showRelocation",
        ].includes(name) &&
        type === "checkbox" &&
        checked === false
      ) {
        console.log("Name value", name);
        switch (name) {
          case "showBonus":
            updatedData.employeeBasicPay =
              parseInt(formData.employeeBasicPay) - parseInt(formData.gb);
            updatedData.gb = 0;
            break;
          case "showJoiningBonus":
            updatedData.employeeBasicPay =
              parseInt(formData.employeeBasicPay) - parseInt(formData.fb);
            updatedData.fb = 0;
            break;
          case "showPb":
            updatedData.employeeBasicPay =
              parseInt(formData.employeeBasicPay) -
              parseInt(formData.performanceBonus);
            updatedData.performanceBonus = 0;
            break;
          case "showIncentive":
            updatedData.employeeBasicPay =
              parseInt(formData.employeeBasicPay) -
              parseInt(formData.incentive);
            updatedData.incentive = 0;
            break;
          case "showRelocation":
            updatedData.employeeBasicPay =
              parseInt(formData.employeeBasicPay) -
              parseInt(formData.relocation);
            updatedData.relocation = 0;
            break;
        }

        // updatedData.selectedOption = prevData.selectedOption === name ? null : name;
        updatedData.selectedOption = checked ? name : null;
      }
      let parsedValue = parseInt(value.replace(/,/g, ""), 10);
      if (name === "gb") {
        updatedData.gbInWords = numberToText(
          parsedValue,
          formData.country === "India" ? "Indian" : "English"
        );
      }
        if (name === "fb") {
          updatedData.fbInWords = numberToText(
            parsedValue,
            formData.country === "India" ? "Indian" : "English"
          );
        }
      function formatIndianNumberingSystem(number) {
        return number.toLocaleString(
          formData.country === "India" ? "en-IN" : "en-US"
        );
      }
      if (name === "annualSalary") {
        if (!isNaN(parsedValue)) {
          let formattedNumber = formatIndianNumberingSystem(parsedValue);

          updatedData.annualSalary = parsedValue;
          updatedData.formattedAnnualSalary = formattedNumber;
          // updatedData.annualSalaryInWords = numberToText(
          //   parsedValue,
          //   formData.country === "India" ? "Indian" : "English"
          // );
        } else {
          updatedData.annualSalary = "";
        }
      }
      if (
        name === "annualSalary" ||
        name === "insurance" ||
        name === "gb" ||
        name === "fb" ||
        name === "pf" ||
        name === "performanceBonus" ||
        name === "relocation" ||
        name === "incentive"
      ) {
        console.log("Insidee", name, updatedData.performanceBonus);
        let gross =
          parseInt(updatedData.annualSalary) -
          parseInt(updatedData.insurance) -
          parseInt(updatedData.gb) -
          parseInt(updatedData.fb) -
          parseInt(updatedData.pf) -
          parseInt(updatedData.performanceBonus) -
          parseInt(updatedData.relocation) -
          parseInt(updatedData.incentive);
        let totalGross =
          parseInt(updatedData.hra) +
          parseInt(updatedData.employeeBasicPay) +
          (parseInt(updatedData.annualSalary) -
            parseInt(updatedData.hra) -
            parseInt(updatedData.insurance) -
            parseInt(updatedData.gb) -
            parseInt(updatedData.fb) -
            parseInt(updatedData.pf) -
            parseInt(updatedData.performanceBonus) -
            parseInt(updatedData.incentive) -
            parseInt(updatedData.relocation) -
            parseInt(updatedData.employeeBasicPay)) +
          parseInt(updatedData.pf) +
          parseInt((updatedData.employeeBasicPay * 4.81) / 100) +
          parseInt(updatedData.insurance) +
          parseInt(updatedData.gb) +
          parseInt(updatedData.fb) +
          parseInt(updatedData.performanceBonus) +
          parseInt(updatedData.incentive) +
          parseInt(updatedData.relocation);
        // let totalGross = gross-parseInt(updatedData.employeeBasicPay)+parseInt(updatedData.hra)
        updatedData.annualGrossSalary = formatIndianNumberingSystem(totalGross);
        updatedData.annualSalaryInWords = numberToText(
          totalGross,
          formData.country === "India" ? "Indian" : "English"
        );
      }

      if (
        [
          "annualSalary",
          "insurance",
          "gb",
          "fb",
          "pf",
          "performanceBonus",
          "incentive",
          "relocation",
          "showBonus",
          "showJoiningBonus",
          "showPb",
          "showIncentive",
          "showRelocation",
        ].includes(name)
      ) {
        console.log("name=============>", updatedData.performanceBonus);
        const annualDeductions =
          parseFloat(updatedData.insurance || 0) +
          parseFloat(updatedData.gb || 0) +
          parseFloat(updatedData.fb || 0) +
          parseFloat(updatedData.pf || 0) +
          parseFloat(updatedData.performanceBonus || 0) +
          parseFloat(updatedData.relocation || 0) +
          parseFloat(updatedData.incentive || 0);
        console.log("Annual deductions =====>", annualDeductions);
        const basicPay =
          (parseFloat(updatedData.annualSalary || 0) - annualDeductions) * 0.4;
        const hra = basicPay / 2;
        console.log("Basic pay", basicPay);
        updatedData.employeeBasicPay = basicPay;
        updatedData.hra = hra;
      }

      return updatedData;
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "100vw", display: "flex" }}>
      <div style={{ width: "20vw" }}>
        <h1>Offer Letter Generator</h1>

        <div
          style={{
            width: "25vw",
            position: "relative",
            height: "85vh",
            overflow: "scroll",
          }}
        >
          <form>
            {/* First Name */}
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
              {/* <Grid2 item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="country"
                      onChange={handleChange}
                      value="NZ"
                      checked={formData.country === "NZ"}
                    />
                  }
                  label="NZ Offer Letter"
                />
              </Grid2> */}
            </Grid2>

            <Grid2
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid2 item size={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item size={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item size={12}>
                <TextField
                  fullWidth
                  label="Candidate Designation"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item size={12}>
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
              <Grid2 item size={12}>
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

            <Grid2
              container
              rowSpacing={1}
              mt={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid2 item size={12}>
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
              <Grid2 item size={12}>
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

              <Grid2 item size={12}>
                <TextField
                  fullWidth
                  label="Reporting Manager"
                  name="reportingManager"
                  value={formData.reportingManager}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid2>
              <Grid2 item size={12}>
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
             {formData.country === "India" && (
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
             )}
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
                  disabled={!formData.showBonus}
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
                  disabled={!formData.showJoiningBonus}
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
                  label="Performance Bonus"
                  name="performanceBonus"
                  type="Number"
                  value={formData.performanceBonus}
                  disabled={!formData.showPb}
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
                  label="Reloaction Alowance"
                  name="relocation"
                  type="Number"
                  disabled={!formData.showRelocation}
                  value={formData.relocation}
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
                  label="Incentive"
                  name="incentive"
                  type="Number"
                  value={formData.incentive}
                  disabled={!formData.showIncentive}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid2>
            </Grid2>
            <Grid2 container mt={2} spacing={2}>
              {formData.country === "India" && (
                <>
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
                </>
              )}

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
            </Grid2>
            <Grid2 container mt={2} spacing={2}>
              <Grid2 item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="showBonus"
                      onChange={handleChange}
                      checked={formData.showBonus}
                    />
                  }
                  label="Guaranteed Bonus"
                />
                {formData.showBonus && (
                  <Grid container mt={2} spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Guaranteed Bonus Description"
                        name="guaranteedBonusDesc"
                        multiline
                        rows={3}
                        value={formData.guaranteedBonusDesc}
                        onChange={handleChangeDesc}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        type="button"
                        onClick={() => handleSave("guaranteedBonusDesc")}
                      >
                        Save Guaranteed Bonus
                      </button>
                    </Grid>
                  </Grid>
                )}
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
                  label="Joining Bonus"
                />
                {/* formData.selectedOption ===
                  "showJoiningBonus" */}
                {formData.showJoiningBonus && (
                  <Grid container mt={2} spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Joining Bonus Description"
                        name="joiningBonusDesc"
                        multiline
                        rows={3}
                        value={formData.joiningBonusDesc}
                        onChange={handleChangeDesc}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        type="button"
                        onClick={() => handleSave("joiningBonusDesc")}
                      >
                        Save Joining Bonus
                      </button>
                    </Grid>
                  </Grid>
                )}
              </Grid2>
              <Grid2 item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="showPb"
                      onChange={handleChange}
                      checked={formData.showPb}
                    />
                  }
                  label="Performance Bonus"
                />
                {/* formData.selectedOption === "showPb" && */}
                {formData.showPb && (
                  <Grid container mt={2} spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Performance Bonus Description"
                        name="performanceBonusDesc"
                        multiline
                        rows={3}
                        value={formData.performanceBonusDesc}
                        onChange={handleChangeDesc}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        type="button"
                        onClick={() => handleSave("performanceBonusDesc")}
                      >
                        Save Performance Bonus
                      </button>
                    </Grid>
                  </Grid>
                )}
              </Grid2>
              <Grid2 item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="showIncentive"
                      onChange={handleChange}
                      checked={formData.showIncentive}
                    />
                  }
                  label="Incentive"
                />
                {formData.showIncentive && (
                  <Grid container mt={2} spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Incentive Description"
                        name="incentiveDesc"
                        multiline
                        rows={3}
                        value={formData.incentiveDesc}
                        onChange={handleChangeDesc}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        type="button"
                        onClick={() => handleSave("incentiveDesc")}
                      >
                        Save Guaranteed Bonus
                      </button>
                    </Grid>
                  </Grid>
                )}
              </Grid2>

              <Grid2 item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="showRelocation"
                      onChange={handleChange}
                      checked={formData.showRelocation}
                    />
                  }
                  label="Relocation allowance"
                />
                {formData.showRelocation && (
                  <Grid container mt={2} spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Relocation Description"
                        name="relocationDesc"
                        multiline
                        rows={3}
                        value={formData.relocationDesc}
                        onChange={handleChangeDesc}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <button
                        type="button"
                        onClick={() => handleSave("relocationDesc")}
                      >
                        Save Guaranteed Bonus
                      </button>
                    </Grid>
                  </Grid>
                )}
              </Grid2>
            </Grid2>
          </form>
        </div>
      </div>
      {formData.country === "India" && <UsofferLetter formData={formData} />}
      {formData.country === "USA" && <IndianOfferLetter formData={formData} />}
      {formData.country === "NZ" && <NzOfferLetter formData={formData} />}
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
