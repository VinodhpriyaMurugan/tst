import jsPDF from "jspdf";
import moment from "moment";
import headerImage from "./Assets/Header.png";
import footerImage from "./Assets/Footer.png";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import numberToText from "number2text/lib/numberToText";
import seal from "./Assets/seal.png";
// import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
const styles = {
  th: {
    textAlign: "left",
    padding: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#002060",
    fontWeight: "bold",
    color: "white",
  },
  td: {
    textAlign: "left",
    padding: "8px",
    border: "1px solid #ddd",
  },
  total: {
    textAlign: "left",
    padding: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#00b0f0",
  },
  subHeader: {
    textAlign: "center",
    padding: "8px",
    backgroundColor: "#002060",
    color: "white",
  },
  finalRow: {
    marginTop: "20px",
    backgroundColor: "#0070c0",
    textAlign: "center",
    color: "white",
  },
};

export default function UsofferLetter({ formData }) {
  console.log("Form Data ===================>",formData)

  const [isDownloading, setIsDownloading] = useState(false);
  let gross =
    formData.annualSalary -
    formData.insurance -
    formData.gb -
    formData.fb -
    formData.pf;
  function formatIndianNumberingSystem(number) {
    let num = parseInt(number);
    return num.toLocaleString(formData.country === "India" ? "en-IN" : "en-US");
  }
  function convertToWords(parsedValue) {
    return numberToText(
      parsedValue,
      formData.country === "India" ? "Indian" : "English"
    );
  }

  let totalCost =
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
    parseInt(formData.employeeBasicPay * 4.81) +
    formData.gb +
    formData.fb;

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
      { name: "Employer's PF", monthly: formData.pf / 12, annual: formData.pf },
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
        annual: formData.incentive || 0,
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
        parseInt(formData.incentive) +
        parseInt(formData.relocation)
      ).toFixed(0),
    },
  };
  const toggleDownloadStyles = (enable) => {
    const pages = document.querySelectorAll(".page-content");
    pages.forEach((page) => {
      if (enable) {
        page.classList.add("download-mode");
      } else {
        page.classList.remove("download-mode");
      }
    });
  };
  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210; // A4 width
    const pageHeight = 297; // A4 height
    const headerHeight = 30;
    const footerHeight = 30;
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
    pdf.addPage();
    await addPageContent("page-6");
    pdf.save("pageletter.pdf");
  };
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
        Download
        {/* {formData.country === "India" ? "Indian" : "USA"} Offer Letter */}
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
            //  style={isDownloading ? pdfStyles : previewStyles}
          >
            <h3 style={{ width: "100%", textAlign: "center" }}>
              Strictly Private and Confidential
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Dear {formData.firstName} {formData.lastName},
              </p>
              <p>{moment(new Date()).format("MMMM DD, YYYY")}</p>
            </div>
            <p>
              Based on our discussions, I am pleased to offer you employment
              with TPF Software India Private Limited (the “Company”) as set out
              in the terms detailed below:
            </p>
            <h3>Joining Date</h3>
            <p>
              Your scheduled date of employment with us will be{" "}
              {moment(formData.joiningDate).format("MMMM DD, YYYY")} the Company
              however reserves the right, at its absolute discretion, to extend
              the date of joining if it considers it necessary. You shall be
              notified in advance if the date of joining is being extended and
              the new date of joining will be informed accordingly. In case you
              do not join the services of the company by{" "}
              {moment(formData.joiningDate).format("MMMM DD, YYYY")} this offer
              of appointment will stand cancelled and withdrawn without any
              further communication. Your appointment stands effective from the
              date you report in for work, which under no circumstances shall be
              later than date of joining. Any request for change in date unless
              communicated and accepted in writing will not be effective.
            </p>
            <h3> Position</h3>
            <p>
              You will be employed in the full-time position, at 40 hours per
              week
            </p>
            <p>Job Title : {formData.jobTitle}</p>
            <p>
              {" "}
              Reporting To : {formData.reportingManager} -{" "}
              {formData.reportingManagerJobTitle}
            </p>

            <h3>Location</h3>
            <p>
              Head office located at Featherlite, The address,Block A, 6th
              floor, Unit no : 601, Featherlite The Address, Survey No 203/10B,
              200ft, Road, Zamin Pallavaram, MMRD, Chennai, Tamil Nadu 600044
            </p>
            <h3>Salary</h3>
            <p>
              Your Cost to Company shall be Rs.
              {formatIndianNumberingSystem(data.totalCost.annual)} {""}
              {convertToWords(data.totalCost.annual)}/- per annum. The break-up
              of your compensation is attached as annexure I. Your remuneration
              shall be divided into 12 (twelve) equal monthly instalments and
              will be paid to you monthly, by way of a direct credit transfer to
              your bank account, as appearing in the records of the Company.
            </p>
            <h3>Compensation and Benefit</h3>
            {/* <h3>Salary</h3> */}
            <p>
              Your salary and other benefits, if any, shall be subject to the
              deductions of all Government and local taxes, contribution(s),
              etc. as required to be made under the prevailing laws of India and
              shall be further subject. to deductions on account of any
              unauthorized absence for any period beyond the leave entitlement,
              damage to any property of the Company and all other matters as
              governed by the Company&#39;s policy. You will be subjected to
              Annual Performance Review of the respective year. Your career and
              compensation progression will be based on your performance and
              Company policies prevailing at that point of time.
            </p>
            {formData.showPb && (
              <>
                <h3>Performance Management and Salary Revision </h3>
                <p>{formData.performanceBonusDesc}</p>
              </>
            )}
            {formData.showBonus && (
              <>
                <h3>Guaranteed Bonus and Incentive</h3>
                <p>{formData.guaranteedBonusDesc}</p>
              </>
            )}
            {formData.showJoiningBonus && (
              <>
                <h3> Joining bonus</h3>

                <p>
                  {" "}
                  <b> INR {formatIndianNumberingSystem(formData.fb)} </b>
                  {formData.joiningBonusDesc}
                </p>
              </>
            )}
            {formData.showIncentive && (
              <>
                <h3> Incentive</h3>

                <p>
                  {" "}
                  {formData.incentive > 0 && (
                    <b>
                      {" "}
                      INR {formatIndianNumberingSystem(formData.incentive)}{" "}
                    </b>
                  )}
                  {formData.incentiveDesc}
                </p>
              </>
            )}
            {formData.showRelocation && (
              <>
                <h3> Relocation</h3>

                <p>
                  {" "}
                  {formData.relocation > 0 && (
                    <b>
                      {" "}
                      INR {formatIndianNumberingSystem(
                        formData.relocation
                      )}{" "}
                    </b>
                  )}
                  {formData.relocationDesc}
                </p>
              </>
            )}
            <h3>Flexible benefit plan (FBP)</h3>
            <p>
              The Flexible benefit plan will be paid to you as part of your
              salary every month. You will have the flexibility of choosing the
              components and amounts under such components as per the options
              provided to you on the Company intranet, based on your preferences
              and income tax plans.
            </p>

            <>
              <h3>Probation and Confirmation</h3>
              <p>
                You will be on probation for a period of 6 (six) months from the
                date of joining us. On successful completion of your probation,
                you will be confirmed as a permanent employee of the company.
                During this period, either party may terminate this contract by
                giving forty-five (45) days’ notice in writing or salary in lieu
                thereof, at the sole discretion of the Company. Within ten (10)
                days after completion of 6 (six) months if you have not received
                a notification stating otherwise including, without limitation,
                extension of probation period from HR, your employment is deemed
                to be confirmed.
              </p>

              <p>
                After the expiry of the probation period or the extended
                probation period (if the same has been extended) either party is
                entitled to terminate the contract by giving Ninety (90) days’
                notice. Whereas the Company reserves the right to request
                service of notice or pay salary in lieu of your notice period,
                waiver or payment in lieu will be at the sole discretion of the
                Company, but in no event will be less than the minimum period
                required by applicable law.
              </p>
              <p>
                For computing the probation period, your actual date of joining
                the Company shall be taken into consideration. Leave You will be
                governed by TSI India leave policy announced from time to time.
                Further details will be provided to you at the time of joining.
                Notice period.
              </p>
              <p>
                In case of your resignation from the services of the Company,
                the Company at its sole discretion shall have a right, but not
                an obligation, to waive off the notice period and in such cases
                the Company will not be liable to make any payment of salary to
                the employee in lieu of the waived off notice period.
              </p>
              <ol>
                <li>
                  During notice period, leave will not be permitted except in
                  case of medical emergency. Payment in lieu of unserved notice
                  period will be recovered from the employee or notice period
                  may get extended.
                </li>
                <li>
                  At the time of termination of your employment contract, you
                  are required to return to the Company in acceptable conditions
                  all such properties of the Company which are in your
                  possession.
                </li>
                <li>
                  You agree that following the notice of termination of your
                  employment, you shall cooperate fully with the Company and to
                  the satisfaction of the Company in all matters relating to
                  your 3 employment with the Company and the orderly transition
                  of such work to such other employees / persons as the Company
                  may designate.
                </li>
              </ol>
              <h3>Termination without notice</h3>
              <p>
                At the sole discretion of the company your service is liable to
                be terminated without any notice or salary in lieu thereof in
                the event of your involvement in any serious misconduct,
                nonappearance to work without any communication, misdemeanour or
                any offense which may or may not be directly connected with the
                business of the company. Other terms and conditions
              </p>
              <ul>
                <li>
                  <p>
                    During your employment, you will be subject to the service
                    rules, regulations, and policy of the company applicable
                    from time to time.
                  </p>
                </li>
                <li>
                  <p>
                    The Company may, at its discretion conduct background checks
                    prior to or after your expected joining date to validate
                    your identity, the address provided by you, your education
                    details, and details of your prior work experience if any,
                    and to conduct any criminal checks. You expressly consent to
                    the Company conducting such background checks. This offer
                    will be cancelled and your employment with the company will
                    be terminated with immediate effect, if any of the
                    information provided by you is found to be false or
                    misleading in the final background check report.
                  </p>
                </li>
              </ul>

              <p>
                We certainly hope that you will be pleased with the foregoing.
              </p>
              <p>
                If you wish to accept this offer of employment with the Company,
                you must sign and return all the attached documents by no later
                than 07.00 p.m. IST,{" "}
                {moment(formData.expiryDate).format("MMMM DD YYYY")}
              </p>
              <p>
                Please feel free to contact Jaishree Vignesh
                (jaishree.vignesh@tpfsoftware.com) if you have any questions or
                concerns.
              </p>
              <p>
                I accept this offer of employment and acknowledge that all the
                information I have provided in relation to my application for
                employment and capacity to undertake the role is true and
                correct and I understand that if I have provided any false or
                misleading information, TPF Software India Private Limited has
                the right to terminate the employment. I acknowledge that I have
                read and understood each term and condition set out in this
                appointment letter &amp; the enclosed Annexure and hereby agree,
                accept, and undertake to abide by all the aforesaid terms and
                conditions.
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 40px",
                  // border: "1px solid #ccc",
                }}
              >
                {/* Left Side */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "20px",
                    width: "100%",
                    // border: "1px solid #ccc",
                  }}
                >
                  {/* Left Side */}
                  <div style={{ textAlign: "left" }}>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Accepted by</strong>
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>
                        Name:{formData.firstName} {formData.lastName}
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
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        margin: "auto",
                        height: "60px",
                        width: "260px",
                      }}
                    >
                      {/* Dynamic Signature */}
                      {formData.signature ? (
                        <img
                          src={URL.createObjectURL(formData.signature)}
                          alt="Signature"
                          style={{ width: "15vw", height: "100%" }}
                        />
                      ) : (
                        <span style={{ color: "#ccc" }}>Signature</span>
                      )}
                    </div>
                    <p style={{ margin: "5px 0" }}>
                      <strong>
                        {formData.hrName} - {formData.hrDesignation}
                      </strong>
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      <strong>Date:</strong>{" "}
                      <span>{moment(new Date()).format("MMMM DD, YYYY")}</span>
                    </p>
                    <img
                      src={seal}
                      alt="Signature"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
                <h3 style={{ textAlign: "center" }}>Annexure - 1</h3>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "1px solid #ddd",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#002060 !important" }}>
                      <th style={styles.th}>Components</th>
                      <th style={styles.th}>Monthly in INR</th>
                      <th style={styles.th}>Annual in INR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Basic rows */}
                    {data.components.map((item) => (
                      <tr key={item.name}>
                        <td style={styles.td}>{item.name}</td>
                        <td style={styles.td}>
                          {formatIndianNumberingSystem(item.monthly)}
                        </td>
                        <td style={styles.td}>
                          {formatIndianNumberingSystem(item.annual)}
                        </td>
                      </tr>
                    ))}
                    {/* Total Fixed Pay row */}
                    <tr style={styles.highlightRow}>
                      <td style={styles.total}>Total Gross Pay (A)</td>
                      <td style={styles.total}>
                        {formatIndianNumberingSystem(
                          data.totalFixedPay.monthly
                        )}
                      </td>
                      <td style={styles.total}>
                        {formatIndianNumberingSystem(data.totalFixedPay.annual)}
                      </td>
                    </tr>
                    {/* Statutory Benefit Header */}
                    <tr>
                      <td style={styles.subHeader} colSpan={3}>
                        Statutory Benefit
                      </td>
                    </tr>
                    {/* Statutory Benefit rows */}
                    {data.benefits.map((item) => (
                      <tr key={item.name}>
                        <td style={styles.td}>{item.name}</td>
                        <td style={styles.td}>
                          {item.monthly !== 0
                            ? formatIndianNumberingSystem(item.monthly)
                            : ""}
                        </td>
                        <td style={styles.td}>
                          {item.annual !== 0
                            ? formatIndianNumberingSystem(item.annual)
                            : ""}
                        </td>
                      </tr>
                    ))}
                    {/* Total Benefits row */}
                    <tr style={styles.highlightRow}>
                      <td style={styles.total}>Total Benefits (B)</td>
                      <td style={styles.total}>
                        {data.totalBenefits.monthly !== 0
                          ? formatIndianNumberingSystem(
                              data.totalBenefits.monthly
                            )
                          : ""}
                      </td>
                      <td style={styles.total}>
                        {formatIndianNumberingSystem(data.totalBenefits.annual)}
                      </td>
                    </tr>
                    <tr>
                      <td style={styles.subHeader} colSpan={3}>
                        Other Benefits
                      </td>
                    </tr>
                    {/* Total Cost to Company row */}
                    {data.Bonus.map((item) => {
                      if (
                        item.name === "Guaranteed Bonus" &&
                        !formData.showBonus
                      )
                        return null;
                      if (
                        item.name === "Joining Bonus" &&
                        !formData.showJoiningBonus
                      )
                        return null;
                      if (item.name === "Performance Bonus" && !formData.showPb)
                        return null;
                      if (item.name === "Incentive" && !formData.showIncentive)
                        return null;
                      if (
                        item.name === "Relocation Allowance" &&
                        !formData.showRelocation
                      )
                        return null;

                      return (
                        <tr key={item.name}>
                          <td style={styles.td}>{item.name}</td>
                          <td style={styles.td}>
                            {item.monthly !== 0
                              ? formatIndianNumberingSystem(item.monthly)
                              : ""}
                          </td>
                          <td style={styles.td}>
                            {item.annual !== 0
                              ? formatIndianNumberingSystem(item.annual)
                              : ""}
                          </td>
                        </tr>
                      );
                    })}
                    {data.totalBonus.annual > 0 && (
                      <tr style={styles.highlightRow}>
                        <td style={styles.total}>Total Benefits (C)</td>
                        <td style={styles.total}>
                          {data.totalBonus.monthly !== 0
                            ? formatIndianNumberingSystem(
                                data.totalBonus.monthly
                              )
                            : ""}
                        </td>
                        <td style={styles.total}>
                          {formatIndianNumberingSystem(data.totalBonus.annual)}
                        </td>
                      </tr>
                    )}
                    <tr style={styles.finalRow}>
                      <td style={styles.td}>
                        {data.totalBonus.annual > 0
                          ? "Total Cost to the Company (A + B+ C)"
                          : "Total Cost to the Company (A + B)"}
                      </td>
                      <td style={styles.td}>
                        {data.totalCost.monthly !== 0
                          ? formatIndianNumberingSystem(data.totalCost.monthly)
                          : ""}
                      </td>
                      <td style={styles.td}>
                        {formatIndianNumberingSystem(data.totalCost.annual)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h6
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  *** applicable only for the first year of employment
                </h6>
                <p>
                  Note: The salary structure provided in Annexure-I is subject
                  to change based on the insurance premium, FBP declaration, tax
                  regime, and investment proof. Please note that the insurance
                  premium is subject to change based on the annual insurance
                  renewal.
                </p>
              </div>
              <h3>Compensation Details</h3>
              <p>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    Basic - Is around 40% of the Annual CTC, it will be paid
                    monthly through payroll and is subject to tax as per the
                    prevailing income Tax rules.
                  </li>
                  <li>
                    House Rent Allowance (HRA) – 50 % of the Annual Basic, it
                    will be paid monthly through payroll. The tax exemption may
                    be claimed on submission of rent receipt/ lease agreement as
                    per the prevailing income tax rules.
                  </li>
                  <li>
                    Flexible Pay – Balance payments from your allocated fixed
                    CTC.
                  </li>
                </ul>
              </p>
              <h3>Retiral Benefits</h3>
              <p>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    <strong> PF </strong>– Company will contribute a maximum of
                    INR1800 against your retiral benefit prescribed by PF act.
                  </li>
                  <li>
                    <strong> House Rent Allowance (HRA)</strong> – 50 % of the
                    Annual Basic, it will be paid monthly through payroll. The
                    tax exemption may be claimed on submission of rent receipt/
                    lease agreement as per the prevailing income tax rules.
                  </li>
                </ul>
              </p>
              <h3>Insurance Benefits</h3>
              <p>
                <p>
                  The benefit cost is subject to change year on year based on
                  overall group premium cost any increase or decrease in the
                  premium will be adjusted against CTC.
                </p>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    <strong>Group Term Life Insurance:</strong> This provides
                    life coverage for the employee in case of any eventuality,
                    for the sum insured of Minimum of INR 20,00,000 and Maximum
                    of sum insured of 3.5 times of Annual Fixed pay.
                  </li>
                  <li>
                    <strong> Group Personal Accident:</strong> This provides you
                    with round the clock financial protection in case of an
                    accident in India, Coverage Limit: INR20,00,000 lakhs (Only
                    for employee)
                  </li>
                </ul>
              </p>
              <h3>Flexible benefit plan</h3>

              <p>
                Basket of various allowances/ expenses considered for Income Tax
                exemption. Under FBP, you will be granted Telephone and Internet
                Allowance, Books &amp; Periodicals Hostel Allowance,
                Non-transferable food coupons. Employees are given the option to
                decide which components they want to take and how much they want
                to take under each component with some predefined checks and
                balances.
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // height: '100vh',
                  margin: 0,
                }}
              >
                <table border="1" cellspacing="0" cellpadding="5">
                  <thead>
                    <tr>
                      <th>Flexible Benefit Plan Component</th>
                      <th>Maximum Value Per Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Food Allowance</td>
                      <td>2200</td>
                    </tr>
                    <tr>
                      <td>Internet Allowance</td>
                      <td>3000</td>
                    </tr>
                    <tr>
                      <td>LTA</td>
                      <td>3000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
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
              margin: "10px",
              // border: "1px solid #ddd",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "27px",
              position: "relative",
              lineHeight: "50px",
              textAlign: "justify",
            }}
            //  style={isDownloading ? pdfStyles : previewStyles}
          >
            <h3 style={{ width: "100%", textAlign: "center" }}>
              Strictly Private and Confidential
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Dear {formData.firstName} {formData.lastName},
              </p>
              <p>{moment(new Date()).format("MMMM DD, YYYY")}</p>
            </div>
            <p>
              Based on our discussions, I am pleased to offer you employment
              with TPF Software India Private Limited (the “Company”) as set out
              in the terms detailed below:
            </p>
            <h3>Joining Date</h3>
            <p>
              Your scheduled date of employment with us will be{" "}
              {moment(formData.joiningDate).format("MMMM DD, YYYY")} the Company
              however reserves the right, at its absolute discretion, to extend
              the date of joining if it considers it necessary. You shall be
              notified in advance if the date of joining is being extended and
              the new date of joining will be informed accordingly. In case you
              do not join the services of the company by{" "}
              {moment(formData.joiningDate).format("MMMM DD, YYYY")} this offer
              of appointment will stand cancelled and withdrawn without any
              further communication. Your appointment stands effective from the
              date you report in for work, which under no circumstances shall be
              later than date of joining. Any request for change in date unless
              communicated and accepted in writing will not be effective.
            </p>
            <h3> Position</h3>
            <p>
              You will be employed in the full-time position, at 40 hours per
              week
            </p>
            <p>Job Title : {formData.jobTitle}</p>
            <p>
              {" "}
              Reporting To : {formData.reportingManager} -{" "}
              {formData.reportingManagerJobTitle}
            </p>

            <h3>Location</h3>
            <p>
              Head office located at Featherlite, The address,Block A, 6th
              floor, Unit no : 601, Featherlite The Address, Survey No 203/10B,
              200ft, Road, Zamin Pallavaram, MMRD, Chennai, Tamil Nadu 600044
            </p>
            <h3>Salary</h3>
            <p>
              Your Cost to Company shall be Rs.
              {formatIndianNumberingSystem(data.totalCost.annual)} {""}
              {convertToWords(data.totalCost.annual)}/- per annum. The break-up
              of your compensation is attached as annexure I. Your remuneration
              shall be divided into 12 (twelve) equal monthly instalments and
              will be paid to you monthly, by way of a direct credit transfer to
              your bank account, as appearing in the records of the Company.
            </p>
          </div>
          <div
            id="page-2"
            style={{
              width: "350mm",
              minHeight: "297mm",
              padding: "100px",
              margin: "10px",
              // border: "1px solid #ddd",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "27px",
              position: "relative",
              lineHeight:
                formData.showBonus && formData.showJoiningBonus
                  ? "60px"
                  : formData.showBonus || formData.showJoiningBonus
                  ? "55px"
                  : "60px",
              textAlign: "justify",
            }}
          >
            <h3>Compensation and Benefit</h3>
            {/* <h3>Salary</h3> */}
            <p>
              Your salary and other benefits, if any, shall be subject to the
              deductions of all Government and local taxes, contribution(s),
              etc. as required to be made under the prevailing laws of India and
              shall be further subject. to deductions on account of any
              unauthorized absence for any period beyond the leave entitlement,
              damage to any property of the Company and all other matters as
              governed by the Company&#39;s policy. You will be subjected to
              Annual Performance Review of the respective year. Your career and
              compensation progression will be based on your performance and
              Company policies prevailing at that point of time.
            </p>
            {formData.showPb && (
              <>
                <h3>Performance Management and Salary Revision </h3>
                <p>
                  {/* You will be subjected to the Annual Performance Review of the
                respective year. Your career and compensation progression will
                be based on your performance and Company policies prevailing at
                that point of time. */}
                  {formData.performanceBonusDesc}
                </p>
              </>
            )}
            {formData.showBonus && (
              <>
                <h3>Guaranteed Bonus and Incentive</h3>
                <p>{formData.guaranteedBonusDesc}</p>
              </>
            )}
            {formData.showJoiningBonus && (
              <>
                <h3> Joining bonus</h3>

                <p>
                  {" "}
                  <b> INR {formatIndianNumberingSystem(formData.fb)} </b>
                  {formData.joiningBonusDesc}
                </p>
              </>
            )}
            {formData.showIncentive && (
              <>
                <h3> Incentive</h3>

                <p>
                  {" "}
                  {formData.incentive > 0 && (
                    <b>
                      {" "}
                      INR {formatIndianNumberingSystem(formData.incentive)}{" "}
                    </b>
                  )}
                  {formData.incentiveDesc}
                </p>
              </>
            )}
            {formData.showRelocation && (
              <>
                <h3> Relocation</h3>

                <p>
                  {" "}
                  {formData.relocation > 0 && (
                    <b>
                      {" "}
                      INR {formatIndianNumberingSystem(
                        formData.relocation
                      )}{" "}
                    </b>
                  )}
                  {formData.relocationDesc}
                </p>
              </>
            )}
            <h3>Flexible benefit plan (FBP)</h3>
            <p>
              The Flexible benefit plan will be paid to you as part of your
              salary every month. You will have the flexibility of choosing the
              components and amounts under such components as per the options
              provided to you on the Company intranet, based on your preferences
              and income tax plans.
            </p>
            {!formData.showBonus && !formData.showJoiningBonus && (
              <>
                <h3>Probation and Confirmation</h3>
                <p>
                  You will be on probation for a period of 6 (six) months from
                  the date of joining us. On successful completion of your
                  probation, you will be confirmed as a permanent employee of
                  the company. During this period, either party may terminate
                  this contract by giving forty-five (45) days’ notice in
                  writing or salary in lieu thereof, at the sole discretion of
                  the Company. Within ten (10) days after completion of 6 (six)
                  months if you have not received a notification stating
                  otherwise including, without limitation, extension of
                  probation period from HR, your employment is deemed to be
                  confirmed.
                </p>
              </>
            )}
          </div>
          <div
            id="page-3"
            style={{
              width: "350mm",
              minHeight: "297mm",
              padding: "100px",
              margin: "10px",
              // border: "1px solid #ddd",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "27px",
              position: "relative",
              lineHeight:
                formData.showBonus && formData.showJoiningBonus
                  ? "60px"
                  : formData.showBonus || formData.showJoiningBonus
                  ? "50px"
                  : "55px",
              textAlign: "justify",
            }}
          >
            {(formData.showBonus || formData.showJoiningBonus) && (
              <>
                <h3>Probation and Confirmation</h3>
                <p>
                  You will be on probation for a period of 6 (six) months from
                  the date of joining us. On successful completion of your
                  probation, you will be confirmed as a permanent employee of
                  the company. During this period, either party may terminate
                  this contract by giving forty-five (45) days’ notice in
                  writing or salary in lieu thereof, at the sole discretion of
                  the Company. Within ten (10) days after completion of 6 (six)
                  months if you have not received a notification stating
                  otherwise including, without limitation, extension of
                  probation period from HR, your employment is deemed to be
                  confirmed.
                </p>
              </>
            )}

            <p>
              After the expiry of the probation period or the extended probation
              period (if the same has been extended) either party is entitled to
              terminate the contract by giving Ninety (90) days’ notice. Whereas
              the Company reserves the right to request service of notice or pay
              salary in lieu of your notice period, waiver or payment in lieu
              will be at the sole discretion of the Company, but in no event
              will be less than the minimum period required by applicable law.
            </p>
            <p>
              For computing the probation period, your actual date of joining
              the Company shall be taken into consideration. Leave You will be
              governed by TSI India leave policy announced from time to time.
              Further details will be provided to you at the time of joining.
              Notice period.
            </p>
            <p>
              In case of your resignation from the services of the Company, the
              Company at its sole discretion shall have a right, but not an
              obligation, to waive off the notice period and in such cases the
              Company will not be liable to make any payment of salary to the
              employee in lieu of the waived off notice period.
            </p>
            <ol>
              <li>
                During notice period, leave will not be permitted except in case
                of medical emergency. Payment in lieu of unserved notice period
                will be recovered from the employee or notice period may get
                extended.
              </li>
              <li>
                At the time of termination of your employment contract, you are
                required to return to the Company in acceptable conditions all
                such properties of the Company which are in your possession.
              </li>
              <li>
                You agree that following the notice of termination of your
                employment, you shall cooperate fully with the Company and to
                the satisfaction of the Company in all matters relating to your
                3 employment with the Company and the orderly transition of such
                work to such other employees / persons as the Company may
                designate.
              </li>
            </ol>
          </div>
          <div
            id="page-4"
            style={{
              width: "350mm",
              minHeight: "297mm",
              padding: "100px",
              margin: "10px",
              // border: "1px solid #ddd",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "27px",
              position: "relative",
              lineHeight: "45px",
              textAlign: "justify",
            }}
          >
            <h3>Termination without notice</h3>
            <p>
              At the sole discretion of the company your service is liable to be
              terminated without any notice or salary in lieu thereof in the
              event of your involvement in any serious misconduct, nonappearance
              to work without any communication, misdemeanour or any offense
              which may or may not be directly connected with the business of
              the company. Other terms and conditions
            </p>
            <ul>
              <li>
                <p>
                  During your employment, you will be subject to the service
                  rules, regulations, and policy of the company applicable from
                  time to time.
                </p>
              </li>
              <li>
                <p>
                  The Company may, at its discretion conduct background checks
                  prior to or after your expected joining date to validate your
                  identity, the address provided by you, your education details,
                  and details of your prior work experience if any, and to
                  conduct any criminal checks. You expressly consent to the
                  Company conducting such background checks. This offer will be
                  cancelled and your employment with the company will be
                  terminated with immediate effect, if any of the information
                  provided by you is found to be false or misleading in the
                  final background check report.
                </p>
              </li>
            </ul>

            <p>
              We certainly hope that you will be pleased with the foregoing.
            </p>
            <p>
              If you wish to accept this offer of employment with the Company,
              you must sign and return all the attached documents by no later
              than 07.00 p.m. IST,{" "}
              {moment(formData.expiryDate).format("MMMM DD YYYY")}
            </p>
            <p>
              Please feel free to contact Jaishree Vignesh
              (jaishree.vignesh@tpfsoftware.com) if you have any questions or
              concerns.
            </p>
            <p>
              I accept this offer of employment and acknowledge that all the
              information I have provided in relation to my application for
              employment and capacity to undertake the role is true and correct
              and I understand that if I have provided any false or misleading
              information, TPF Software India Private Limited has the right to
              terminate the employment. I acknowledge that I have read and
              understood each term and condition set out in this appointment
              letter &amp; the enclosed Annexure and hereby agree, accept, and
              undertake to abide by all the aforesaid terms and conditions.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 40px",
                // border: "1px solid #ccc",
              }}
            >
              {/* Left Side */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "20px",
                  width: "100%",
                  // border: "1px solid #ccc",
                }}
              >
                {/* Left Side */}
                <div style={{ textAlign: "left" }}>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Accepted by</strong>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>
                      Name:{formData.firstName} {formData.lastName}
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
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      margin: "auto",
                      height: "60px",
                      width: "260px",
                    }}
                  >
                    {/* Dynamic Signature */}
                    {formData.signature ? (
                      <img
                        src={URL.createObjectURL(formData.signature)}
                        alt="Signature"
                        style={{ width: "15vw", height: "100%" }}
                      />
                    ) : (
                      <span style={{ color: "#ccc" }}>Signature</span>
                    )}
                  </div>
                  <p style={{ margin: "5px 0" }}>
                    <strong>
                      {formData.hrName} - {formData.hrDesignation}
                    </strong>
                  </p>
                  <p style={{ margin: "5px 0" }}>
                    <strong>Date:</strong>{" "}
                    <span>{moment(new Date()).format("MMMM DD, YYYY")}</span>
                  </p>
                  <img
                    src={seal}
                    alt="Signature"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            id="page-5"
            style={{
              width: "350mm",
              minHeight: "297mm",
              padding: "100px",
              margin: "10px",
              // border: "1px solid #ddd",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "27px",
              position: "relative",
              lineHeight: "50px",
              textAlign: "justify",
            }}
          >
            <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
              <h3 style={{ textAlign: "center" }}>Annexure - 1</h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #ddd",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#002060 !important" }}>
                    <th style={styles.th}>Components</th>
                    <th style={styles.th}>Monthly in INR</th>
                    <th style={styles.th}>Annual in INR</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Basic rows */}
                  {data.components.map((item) => (
                    <tr key={item.name}>
                      <td style={styles.td}>{item.name}</td>
                      <td style={styles.td}>
                        {formatIndianNumberingSystem(item.monthly)}
                      </td>
                      <td style={styles.td}>
                        {formatIndianNumberingSystem(item.annual)}
                      </td>
                    </tr>
                  ))}
                  {/* Total Fixed Pay row */}
                  <tr style={styles.highlightRow}>
                    <td style={styles.total}>Total Gross Pay (A)</td>
                    <td style={styles.total}>
                      {formatIndianNumberingSystem(data.totalFixedPay.monthly)}
                    </td>
                    <td style={styles.total}>
                      {formatIndianNumberingSystem(data.totalFixedPay.annual)}
                    </td>
                  </tr>
                  {/* Statutory Benefit Header */}
                  <tr>
                    <td style={styles.subHeader} colSpan={3}>
                      Statutory Benefit
                    </td>
                  </tr>
                  {/* Statutory Benefit rows */}
                  {data.benefits.map((item) => (
                    <tr key={item.name}>
                      <td style={styles.td}>{item.name}</td>
                      <td style={styles.td}>
                        {item.monthly !== 0
                          ? formatIndianNumberingSystem(item.monthly)
                          : ""}
                      </td>
                      <td style={styles.td}>
                        {item.annual !== 0
                          ? formatIndianNumberingSystem(item.annual)
                          : ""}
                      </td>
                    </tr>
                  ))}
                  {/* Total Benefits row */}
                  <tr style={styles.highlightRow}>
                    <td style={styles.total}>Total Benefits (B)</td>
                    <td style={styles.total}>
                      {data.totalBenefits.monthly !== 0
                        ? formatIndianNumberingSystem(
                            data.totalBenefits.monthly
                          )
                        : ""}
                    </td>
                    <td style={styles.total}>
                      {formatIndianNumberingSystem(data.totalBenefits.annual)}
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.subHeader} colSpan={3}>
                      Other Benefits
                    </td>
                  </tr>
                  {/* Total Cost to Company row */}
                  {data.Bonus.map((item) => {
                    if (item.name === "Guaranteed Bonus" && !formData.showBonus)
                      return null;
                    if (
                      item.name === "Joining Bonus" &&
                      !formData.showJoiningBonus
                    )
                      return null;
                    if (item.name === "Performance Bonus" && !formData.showPb)
                      return null;
                    if (item.name === "Incentive" && !formData.showIncentive)
                      return null;
                    if (
                      item.name === "Relocation Allowance" &&
                      !formData.showRelocation
                    )
                      return null;

                    return (
                      <tr key={item.name}>
                        <td style={styles.td}>{item.name}</td>
                        <td style={styles.td}>
                          {item.monthly !== 0
                            ? formatIndianNumberingSystem(item.monthly)
                            : ""}
                        </td>
                        <td style={styles.td}>
                          {item.annual !== 0
                            ? formatIndianNumberingSystem(item.annual)
                            : ""}
                        </td>
                      </tr>
                    );
                  })}
                  {data.totalBonus.annual > 0 && (
                    <tr style={styles.highlightRow}>
                      <td style={styles.total}>Total Benefits (C)</td>
                      <td style={styles.total}>
                        {data.totalBonus.monthly !== 0
                          ? formatIndianNumberingSystem(data.totalBonus.monthly)
                          : ""}
                      </td>
                      <td style={styles.total}>
                        {formatIndianNumberingSystem(data.totalBonus.annual)}
                      </td>
                    </tr>
                  )}
                  <tr style={styles.finalRow}>
                    <td style={styles.td}>
                      {data.totalBonus.annual > 0
                        ? "Total Cost to the Company (A + B+ C)"
                        : "Total Cost to the Company (A + B)"}
                    </td>
                    <td style={styles.td}>
                      {data.totalCost.monthly !== 0
                        ? formatIndianNumberingSystem(data.totalCost.monthly)
                        : ""}
                    </td>
                    <td style={styles.td}>
                      {formatIndianNumberingSystem(data.totalCost.annual)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <h6
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                *** applicable only for the first year of employment
              </h6>
              <p>
                Note: The salary structure provided in Annexure-I is subject to
                change based on the insurance premium, FBP declaration, tax
                regime, and investment proof. Please note that the insurance
                premium is subject to change based on the annual insurance
                renewal.
              </p>
            </div>
          </div>
          <div
            id="page-6"
            style={{
              width: "350mm",
              minHeight: "297mm",
              padding: "100px",
              margin: "10px",
              // border: "1px solid #ddd",
              background: "#fff",
              fontFamily: "Arial, sans-serif",
              fontSize: "27px",
              position: "relative",
              lineHeight: "45px",
              textAlign: "justify",
            }}
          >
            <h3>Compensation Details</h3>
            <p>
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li>
                  Basic - Is around 40% of the Annual CTC, it will be paid
                  monthly through payroll and is subject to tax as per the
                  prevailing income Tax rules.
                </li>
                <li>
                  House Rent Allowance (HRA) – 50 % of the Annual Basic, it will
                  be paid monthly through payroll. The tax exemption may be
                  claimed on submission of rent receipt/ lease agreement as per
                  the prevailing income tax rules.
                </li>
                <li>
                  Flexible Pay – Balance payments from your allocated fixed CTC.
                </li>
              </ul>
            </p>
            <h3>Retiral Benefits</h3>
            <p>
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li>
                  <strong> PF </strong>– Company will contribute a maximum of
                  INR1800 against your retiral benefit prescribed by PF act.
                </li>
                <li>
                  <strong> House Rent Allowance (HRA)</strong> – 50 % of the
                  Annual Basic, it will be paid monthly through payroll. The tax
                  exemption may be claimed on submission of rent receipt/ lease
                  agreement as per the prevailing income tax rules.
                </li>
              </ul>
            </p>
            <h3>Insurance Benefits</h3>
            <p>
              <p>
                The benefit cost is subject to change year on year based on
                overall group premium cost any increase or decrease in the
                premium will be adjusted against CTC.
              </p>
              <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                <li>
                  <strong>Group Term Life Insurance:</strong> This provides life
                  coverage for the employee in case of any eventuality, for the
                  sum insured of Minimum of INR 20,00,000 and Maximum of sum
                  insured of 3.5 times of Annual Fixed pay.
                </li>
                <li>
                  <strong> Group Personal Accident:</strong> This provides you
                  with round the clock financial protection in case of an
                  accident in India, Coverage Limit: INR20,00,000 lakhs (Only
                  for employee)
                </li>
              </ul>
            </p>
            <h3>Flexible benefit plan</h3>

            <p>
              Basket of various allowances/ expenses considered for Income Tax
              exemption. Under FBP, you will be granted Telephone and Internet
              Allowance, Books &amp; Periodicals Hostel Allowance,
              Non-transferable food coupons. Employees are given the option to
              decide which components they want to take and how much they want
              to take under each component with some predefined checks and
              balances.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // height: '100vh',
                margin: 0,
              }}
            >
              <table border="1" cellspacing="0" cellpadding="5">
                <thead>
                  <tr>
                    <th>Flexible Benefit Plan Component</th>
                    <th>Maximum Value Per Month</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Food Allowance</td>
                    <td>2200</td>
                  </tr>
                  <tr>
                    <td>Internet Allowance</td>
                    <td>3000</td>
                  </tr>
                  <tr>
                    <td>LTA</td>
                    <td>3000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
