import moment from "moment";
import jsPDF from "jspdf";
import headerImage from "./Assets/usHeader.png";
import footerImage from "./Assets/usFooter.png";
import html2canvas from "html2canvas";
import seal from "./Assets/seal.png";
import numberToText from "number2text/lib/numberToText";
import { useState } from "react";
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
export default function IndianOfferLetter({ formData }) {
  const [isDownloading, setIsDownloading] = useState(false);
  console.log("Form data submitted:", formData);
  const data = {
    components: [
      {
        name: "Basic",
        monthly: (formData.employeeBasicPay / 12).toFixed(0),
        annual: formData.employeeBasicPay,
      },
      {
        name: "HRA",
        monthly: (formData.hra / 12).toFixed(0),
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
        parseInt(formData.hra) / 12 +
        parseInt(formData.employeeBasicPay) / 12 +
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
        parseInt(formData.hra) +
        parseInt(formData.employeeBasicPay) +
        (parseInt(formData.annualSalary) -
          parseInt(formData.hra) -
          parseInt(formData.insurance) -
          parseInt(formData.gb) -
          parseInt(formData.fb) -
          parseInt(formData.pf) -
          parseInt(formData.performanceBonus) -
          parseInt(formData.incentive) -
          parseInt(formData.relocation) -
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
        annual: parseInt((formData.employeeBasicPay * 4.81) / 100).toFixed(0),
      },
    ],
    totalBenefits: {
      monthly: 0,
      annual: (
        parseInt(formData.pf) +
        parseInt(formData.insurance) +
        parseInt((formData.employeeBasicPay * 4.81) / 100)
      ).toFixed(0),
    },
    totalCost: {
      monthly: 0,
      annual:
        parseInt(formData.hra) +
          parseInt(formData.employeeBasicPay) +
          (parseInt(formData.annualSalary) -
            parseInt(formData.hra) -
            parseInt(formData.insurance) -
            parseInt(formData.gb) -
            parseInt(formData.fb) -
            parseInt(formData.pf) -
            parseInt(formData.performanceBonus) -
            parseInt(formData.incentive) -
            parseInt(formData.relocation) -
            parseInt(formData.employeeBasicPay)) +
          parseInt(formData.pf) +
          parseInt(formData.insurance) +
          parseInt((formData.employeeBasicPay * 4.81) / 100) +
          parseInt(formData.gb) +
          parseInt(formData.fb) +
          parseInt(formData.performanceBonus) +
          parseInt(formData.incentive) +
          parseInt(formData.relocation) || 0,
    },

    Bonus: [
      {
        name: "Guaranteed Bonus",
        monthly: 0,
        annual: formData.gb || 0,
      },
      {
        name: "Joining Bonus",
        monthly: 0,
        annual: formData.fb || 0,
      },
      {
        name: "Performance Bonus",
        monthly: 0,
        annual: formData.performanceBonus || 0,
      },
      {
        name: "Incentive",
        monthly: 0,
        annual: 0,
      },
      {
        name: "Relocation Allowance",
        monthly: 0,
        annual: formData.relocation,
      },
    ],
    totalBonus: {
      monthly: 0,
      annual: (
        parseInt(formData.fb) +
        parseInt(formData.performanceBonus) +
        parseInt(formData.gb) +
        parseInt(formData.relocation)
      ).toFixed(0),
    },
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
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
    // pdf.addPage();

    pdf.save("pageletter.pdf");
  };
  function convertToWords(parsedValue) {
    return numberToText(
      parsedValue,
      formData.country === "India" ? "Indian" : "English"
    );
  }
  function formatIndianNumberingSystem(number) {
    let num = parseInt(number);
    return num.toLocaleString(formData.country === "India" ? "en-IN" : "en-US");
  }
  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "10px",
          height: "5vh",
          width: "11vw",
        }}
      >
        Download {formData.country === "India" ? "Indian" : "USA"} Offer Letter
      </button>
      {!isDownloading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "99vw",
            height: "94vh",
            overflow: "scroll",
          }}
        >
          <div
            id="pages1"
            style={{
              width: "300mm",
              // minHeight: "297mm",
              // padding: "100px",
              margin: "10px",
              // border: "1px solid #ddd",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "15px",
              position: "relative",
              lineHeight: "23px",
              textAlign: "justify",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Dear {formData.firstName}
                {formData.lastName},
              </p>
              <p>{moment(new Date()).format("MMMM DD, YYYY")}</p>
            </div>
            <p>
              I am pleased to confirm, in writing, our offer of employment with
              TPF Software Inc, hereafter referred to as “the Company”. Included
              below are the offer terms and conditions for your consideration.
            </p>
            <h3> Position :</h3> <p>{formData.jobTitle}</p>
            <h3> Start Date</h3>
            <p>
              Your provisional start date will be{" "}
              {moment(formData.joiningDate).format("MMMM DD, YYYY")}. Please
              note that this offer is subject to you obtaining and maintaining
              an appropriate visa to work in the United States of America.
            </p>
            <p>
              If you don’t join the company by{" "}
              {moment(formData.joiningDate).format("MMMM DD, YYYY")}, this offer
              will be cancelled without further notice. Your appointment is
              effective from the day you start work, which must not be later
              than the joining date. Any request to change the date will only be
              valid if communicated and approved in writing.
            </p>
            <p>
              <strong>Reporting Relationship:</strong>This position reports to
              the {formData.reportingManagerJobTitle}, currently{" "}
              {formData.reportingManager}
            </p>
            <h3>Compensation and Hours</h3>
            <ul>
              <li>
                <strong>Compensation:</strong> Your Annual Compensation will be
                <b>
                  {" "}
                  USD {formatIndianNumberingSystem(formData.annualGrossSalary)}
                  /- ( {convertToWords(formData.annualGrossSalary)} Dollars
                  Only)
                </b>
                less applicable withholdings.
              </li>
              <li>
                <strong>Pay-period schedule:</strong>Our payroll cycle is
                administered semi-monthly, meaning that you can expect to
                receive pay for time worked on the 15 th and last day of the
                month. A payroll calendar will be provided to you during your
                first week of employment.
              </li>
              <li>
                <strong>Work schedule:</strong>This is a full-time position and
                the expected work hours for the position are at least 40 hours
                per week. You will be expected to work during hours relevant to
                business need.
              </li>
            </ul>
            <p></p>
            <h3>Benefits:</h3>
            <ul>
              <li>
                <p>
                  <strong>Health Benefits:</strong> Subject to plan
                  requirements, full time (30 hours or more per week) employees
                  are eligible to participate in a comprehensive health benefits
                  program upon start date and effective upon first day of
                  employment. Details will be provided to you on your first day
                  as applicable per Company policy.
                </p>
              </li>
              <li>
                <p>
                  <strong>401k Retirement enrolled</strong> employees are
                  eligible to participate in a Company-wide 401(k) plan and will
                  be auto-enrolled at a default rate of 6% upon start.
                  Participants may choose to defer more (or less) at their
                  discretion and with attention to annual IRS deferral limits.
                  Action is required to change deferral or stop participation in
                  the 401(k) program. Further instructions will be included in
                  your onboarding process.
                </p>
              </li>
            </ul>
            <ul>
              <li>
                <p>
                  <strong>Employee Share Purchase Plan (ESPP):</strong>Employees
                  will be able to partake in share purchase program upon their
                  start date. Details will be provided to you on your first day.
                </p>
              </li>
              <li>
                <p>
                  <strong>Paid Time Off Benefits:</strong> You will receive 23
                  days of paid vacation per year, pro-rated for your first year
                  - if applicable. You may use these 23 days of leave among any
                  of the leave categories such as, PTO, Casual Leave, Sick
                  Leave, or any Federal/State holidays. Vacations are to be
                  taken at such time or times as are mutually convenient between
                  the employer and the employee.
                </p>
              </li>
              <li>
                <p>
                  <strong>Travel Expectations:</strong> You might be required to
                  travel within the United States and to other parts of the
                  world as part of your role and your travel expense will be
                  reimbursed in accordance with the prevailing travel policies
                  at TSI.
                </p>
              </li>
              <li>
                <p>
                  <strong>Performance Bonus:</strong> The variable bonus will be
                  contingent on the Company’s overall performance and your
                  personal goals being met. The company reserves the right to
                  amend or withdraw the variable bonus, at its absolute
                  discretion.
                </p>
              </li>
              {formData.showJoiningBonus && (
                <li>
                  <p>
                    <strong>Joining Bonus:</strong> A one-time joining bonus of
                    ${formData.fb} (USD {""}
                    {formData.fbInWords} Dollars) will be granted to you after
                    completing 3 months with the company. However, if you
                    separate from the company within 12 months of joining, the
                    full amount will be recovered from you.
                  </p>
                </li>
              )}
              {formData.showBonus && (
                <li>
                  <p>
                    <strong>Guaranteed Bonus:</strong> In addition to the annual
                    base salary, you shall receive a one-time guaranteed bonus
                    of ${formData.gb}
                    (USD {""}
                    {formData.gbInWords} Dollars) on completion of 12 months of
                    continuous service with TSI.
                  </p>
                </li>
              )}
            </ul>
            <h3>At-will Employment:</h3>
            <p>
              Your employment with the Company is considered “at will,” meaning
              that either you or the Company may terminate this employment
              relationship at any time, with or without cause or notice. No
              Company policies shall be interpreted to conflict with or to
              eliminate or modify in any way the employment-at-will status of
              Company employees.
            </p>
            <p>
              The Company may terminate its employment relationship with you by
              providing 2 weeks’ notice with or without cause. Similarly, you
              are free to resign from your employment relationship by providing
              2 weeks’ notice to the Company at any time, with or without cause.
            </p>
            <h3>Employment Offer Contingencies:</h3>
            <p>Please note that this offer is contingent upon:</p>
            <ul>
              <li>
                <strong>Reference Checks:</strong> Completion of, at minimum,
                two (2) professional and satisfactory reference checks prior to
                your start date.
              </li>
              <li>
                <strong>
                  Proof of legal right to work in the United States:
                </strong>{" "}
                Before starting your employment, you will need to demonstrate
                proof of your legal right to work in the United States. This is
                a requirement set by USCIS for completing the I-9 form. Please
                ensure that you have the necessary documents ready to submit
                before your first day of work
              </li>
              <li>
                <strong>
                  A Signed and Returned Confidentiality, Proprietary Rights and
                  Non-Disclosure Agreement:
                </strong>{" "}
                and Offer letter Please indicate that you have read and
                understood the Agreement by signing where indicated and
                returning a signed copy for countersignature to Human Resources
                email at hr@tpfsoftware.com no later than your first day of
                employment.
              </li>
            </ul>
            <p>
              {" "}
              We look forward to you joining our team! We are confident that we
              can provide the challenge and opportunity you are seeking, and
              sincerely look forward to having you onboard.
            </p>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: "5px 0" }}>
                {formData.signature ? (
                  <img
                    src={URL.createObjectURL(formData.signature)}
                    alt="Signature"
                    style={{ width: "15vw", height: "10vh" }}
                  />
                ) : (
                  <span style={{ color: "#ccc" }}>Signature</span>
                )}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>
                  {" "}
                  {formData.hrName} - {formData.hrDesignation}
                </strong>
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Date:</strong>{" "}
                <span>{moment(new Date()).format("MMMM DD, YYYY")}</span>
              </p>
              {/* <img
                src={seal}
                alt="Signature"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              /> */}
            </div>
            <p>
              <strong>Offer Acceptance: </strong>I understand that the Company
              reserves the right to withdraw this Employment Offer if acceptance
              is not made in a timely manner. By accepting this offer, I confirm
              that I am not subject to a non-competition agreement with any
              company that would preclude and/or restrict me from performing in
              the position being offered in this agreement.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "20px",
                  width: "100%",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Accepted by</strong>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>
                      I accept this Offer of Employment:{formData.firstName}{" "}
                      {formData.lastName}
                    </strong>{" "}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <span style={{ textDecoration: "underline" }}>
                      {formData.employeeName}
                    </span>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Date:</strong>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <span style={{ textDecoration: "underline" }}>
                      ____________________
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDownloading && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            id="page-1"
            style={{
              width: "350mm",
              minHeight: "297mm",
              padding: "100px",
              margin: "20px",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "25px",
              position: "relative",
              lineHeight: "50px",
              textAlign: "justify",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Dear {formData.firstName}
                {formData.lastName},
              </p>
              <p>{moment(new Date()).format("MMMM DD, YYYY")}</p>
            </div>
            <p>
              I am pleased to confirm, in writing, our offer of employment with
              TPF Software Inc, hereafter referred to as “the Company”. Included
              below are the offer terms and conditions for your consideration.
            </p>
            <h3> Position :</h3> <p>{formData.jobTitle}</p>
            <h3> Start Date</h3>
            <p>
              Your provisional start date will be{" "}
              {moment(formData.joiningDate).format("MMMM DD, YYYY")}. Please
              note that this offer is subject to you obtaining and maintaining
              an appropriate visa to work in the United States of America.
            </p>
            <p>
              If you don’t join the company by{" "}
              {moment(formData.joiningDate).format("MMMM DD, YYYY")} , this offer
              will be cancelled without further notice. Your appointment is
              effective from the day you start work, which must not be later
              than the joining date. Any request to change the date will only be
              valid if communicated and approved in writing.
            </p>
            <p>
              <strong>Reporting Relationship:</strong>This position reports to
              the {formData.reportingManagerJobTitle}, currently{" "}
              {formData.reportingManager}
            </p>
            <h3>Compensation and Hours</h3>
            <ul>
              <li>
                <strong>Compensation:</strong> Your Annual Compensation will be
                <b>
                  {" "}
                  USD {formatIndianNumberingSystem(formData.annualGrossSalary)}
                  /- ( {convertToWords(formData.annualGrossSalary)} Dollars
                  Only)
                </b>
                less applicable withholdings.
              </li>
              <li>
                <strong>Pay-period schedule:</strong>Our payroll cycle is
                administered semi-monthly, meaning that you can expect to
                receive pay for time worked on the 15 th and last day of the
                month. A payroll calendar will be provided to you during your
                first week of employment.
              </li>
              <li>
                <strong>Work schedule:</strong>This is a full-time position and
                the expected work hours for the position are at least 40 hours
                per week. You will be expected to work during hours relevant to
                business need.
              </li>
            </ul>
            <p></p>
            <h3>Benefits:</h3>
            <ul>
              <li>
                <p>
                  <strong>Health Benefits:</strong> Subject to plan
                  requirements, full time (30 hours or more per week) employees
                  are eligible to participate in a comprehensive health benefits
                  program upon start date and effective upon first day of
                  employment. Details will be provided to you on your first day
                  as applicable per Company policy.
                </p>
              </li>
              <li>
                <p>
                  <strong>401k Retirement enrolled</strong> employees are
                  eligible to participate in a Company-wide 401(k) plan and will
                  be auto-enrolled at a default rate of 6% upon start.
                  Participants may choose to defer more (or less) at their
                  discretion and with attention to annual IRS deferral limits.
                  Action is required to change deferral or stop participation in
                  the 401(k) program. Further instructions will be included in
                  your onboarding process.
                </p>
              </li>
            </ul>
          </div>

          <div
            id="page-2"
            style={{
              width: "350mm",
              minHeight: "297mm",
              padding: "100px",
              margin: "20px",
              // border: "1px solid #ddd",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "25px",
              position: "relative",
              lineHeight:
                formData.showBonus && formData.showJoiningBonus
                  ? "50px"
                  : formData.showBonus || formData.showJoiningBonus
                  ? "55px"
                  : "60px",
              textAlign: "justify",
            }}
          >
            <ul>
              <li>
                <p>
                  <strong>Employee Share Purchase Plan (ESPP):</strong>Employees
                  will be able to partake in share purchase program upon their
                  start date. Details will be provided to you on your first day.
                </p>
              </li>
              <li>
                <p>
                  <strong>Paid Time Off Benefits:</strong> You will receive 23
                  days of paid vacation per year, pro-rated for your first year
                  - if applicable. You may use these 23 days of leave among any
                  of the leave categories such as, PTO, Casual Leave, Sick
                  Leave, or any Federal/State holidays. Vacations are to be
                  taken at such time or times as are mutually convenient between
                  the employer and the employee.
                </p>
              </li>
              <li>
                <p>
                  <strong>Travel Expectations:</strong> You might be required to
                  travel within the United States and to other parts of the
                  world as part of your role and your travel expense will be
                  reimbursed in accordance with the prevailing travel policies
                  at TSI.
                </p>
              </li>
              <li>
                <p>
                  <strong>Performance Bonus:</strong> The variable bonus will be
                  contingent on the Company’s overall performance and your
                  personal goals being met. The company reserves the right to
                  amend or withdraw the variable bonus, at its absolute
                  discretion.
                </p>
              </li>
              {formData.showJoiningBonus && (
                <li>
                  <p>
                    <strong>Joining Bonus:</strong> A one-time joining bonus of
                    ${formData.fb} (USD {""}
                    {formData.fbInWords} Dollars) will be granted to you after
                    completing 3 months with the company. However, if you
                    separate from the company within 12 months of joining, the
                    full amount will be recovered from you.
                  </p>
                </li>
              )}
              {formData.showBonus && (
                <li>
                  <p>
                    <strong>Guaranteed Bonus:</strong> In addition to the annual
                    base salary, you shall receive a one-time guaranteed bonus
                    of ${formData.gb}
                    (USD {""}
                    {formData.gbInWords} Dollars) on completion of 12 months of
                    continuous service with TSI.
                  </p>
                </li>
              )}
            </ul>
            <h3>At-will Employment:</h3>
            <p>
              Your employment with the Company is considered “at will,” meaning
              that either you or the Company may terminate this employment
              relationship at any time, with or without cause or notice. No
              Company policies shall be interpreted to conflict with or to
              eliminate or modify in any way the employment-at-will status of
              Company employees.
            </p>
            <p>
              The Company may terminate its employment relationship with you by
              providing 2 weeks’ notice with or without cause. Similarly, you
              are free to resign from your employment relationship by providing
              2 weeks’ notice to the Company at any time, with or without cause.
            </p>
          </div>
          <div
            id="page-3"
            style={{
              width: "350mm",
              minHeight: "297mm",
              padding: "100px",
              margin: "20px",
              // border: "1px solid #ddd",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "25px",
              position: "relative",
              lineHeight: "50px",
              textAlign: "justify",
            }}
          >
            <h3>Employment Offer Contingencies:</h3>
            <p>Please note that this offer is contingent upon:</p>
            <ul>
              <li>
                <strong>Reference Checks:</strong> Completion of, at minimum,
                two (2) professional and satisfactory reference checks prior to
                your start date.
              </li>
              <li>
                <strong>
                  Proof of legal right to work in the United States:
                </strong>{" "}
                Before starting your employment, you will need to demonstrate
                proof of your legal right to work in the United States. This is
                a requirement set by USCIS for completing the I-9 form. Please
                ensure that you have the necessary documents ready to submit
                before your first day of work
              </li>
              <li>
                <strong>
                  A Signed and Returned Confidentiality, Proprietary Rights and
                  Non-Disclosure Agreement:
                </strong>{" "}
                and Offer letter Please indicate that you have read and
                understood the Agreement by signing where indicated and
                returning a signed copy for countersignature to Human Resources
                email at hr@tpfsoftware.com no later than your first day of
                employment.
              </li>
            </ul>
            <p>
              {" "}
              We look forward to you joining our team! We are confident that we
              can provide the challenge and opportunity you are seeking, and
              sincerely look forward to having you onboard.
            </p>
            <div style={{ textAlign: "right" }}>
              {/* <div
            style={{
              margin: "auto",
              height: "60px",
              width: "260px",
            }}
          >
            {formData.signature ? (
              <img
                src={URL.createObjectURL(formData.signature)}
                alt="Signature"
                style={{ width: "15vw", height: "10vh" }}
              />
            ) : (
              <span style={{ color: "#ccc" }}>Signature</span>
            )}
          </div> */}
              <p style={{ margin: "5px 0" }}>
                {formData.signature ? (
                  <img
                    src={URL.createObjectURL(formData.signature)}
                    alt="Signature"
                    style={{ width: "15vw", height: "10vh" }}
                  />
                ) : (
                  <span style={{ color: "#ccc" }}>Signature</span>
                )}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>
                  {" "}
                  {formData.hrName} - {formData.hrDesignation}
                </strong>
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Date:</strong>{" "}
                <span>{moment(new Date()).format("MMMM DD, YYYY")}</span>
              </p>
              {/* <img
                src={seal}
                alt="Signature"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              /> */}
            </div>
            <p>
              <strong>Offer Acceptance: </strong>I understand that the Company
              reserves the right to withdraw this Employment Offer if acceptance
              is not made in a timely manner. By accepting this offer, I confirm
              that I am not subject to a non-competition agreement with any
              company that would preclude and/or restrict me from performing in
              the position being offered in this agreement.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "20px",
                  width: "100%",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Accepted by</strong>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>
                      I accept this Offer of Employment:{formData.firstName}{" "}
                      {formData.lastName}
                    </strong>{" "}
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <span style={{ textDecoration: "underline" }}>
                      {formData.employeeName}
                    </span>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Date:</strong>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <span style={{ textDecoration: "underline" }}>
                      ____________________
                    </span>
                  </p>
                </div>

                {/* Right Side */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
