import moment from "moment";
import jsPDF from "jspdf";
import headerImage from "./Assets/Header.png";
import footerImage from "./Assets/Footer.png";
import html2canvas from "html2canvas";
import seal from "./Assets/seal.png";
import numberToText from "number2text/lib/numberToText";
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
export default function NzOfferLetter({ formData }) {
  function formatIndianNumberingSystem(number) {
    console.log("Formattin  number", number);
    let num = parseInt(number);
    return num.toLocaleString(formData.country === "India" ? "en-IN" : "en-US");
  }
  function convertToWords(parsedValue) {
    return numberToText(
      parsedValue,
      formData.country === "India" ? "Indian" : "English"
    );
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
    // pdf.addPage();

    pdf.save("pageletter.pdf");
  };
  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Download {formData.country === "India" ? "Indian" : "USA"} Offer Letter
      </button>
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
      >
        <h3 style={{ width: "100%", textAlign: "center" }}>
          Individual Employment Agreement Standard Permanent
        </h3>
        <h3 style={{ width: "100%", textAlign: "center" }}>
          TSI Software NZ Limited
        </h3>
        <h3 style={{ width: "100%", textAlign: "center" }}>
          {formData.firstName} {formData.lastName}
        </h3>

        <h3>Introduction</h3>
        <p>
          Welcome to TSI Software NZ Limited. This agreement contains your terms
          and conditions of employment. To accept employment with us please sign
          the agreement and return a copy to us. You are invited to get
          independent advice before you sign this agreement. This agreement
          supersedes all prior agreements and understanding, written or oral,
          between TSI Software NZ Limited and yourself.
        </p>

        <h3>Parties</h3>
        <p>
          TSI Software NZ Limited (We/Us) Office 1016, 21 Queen Street, Zurich
          Building Level 10, CBD, Auckland 1010, New Zealand.
        </p>
        <h3>Operative provisions</h3>
        <h3>1 Position and commencement date</h3>
        <h3>The position</h3>
        <p>
          <span style={{ marginRight: "20px" }}>1.1</span>
          We are employing you to work for us as Senior Quality Assurance
          Engineer at TSI Software NZ Limited. Your role will be based at our
          Auckland Office.
        </p>
        <h3>Reporting</h3>
        <p>
          <span style={{ marginRight: "20px" }}>1.2</span>
          Your reporting line will be discussed with you on commencement of
          employment.
        </p>
        <h3>Change position and duties</h3>
        <p>
          <span style={{ marginRight: "20px" }}>1.3</span>
          You understand the need for us to enhance efficiency and our ability
          to compete in the marketplace. Our business requires flexibility of
          work functions in recognition of these needs.
        </p>
        <p>
          <span style={{ marginRight: "20px" }}>1.4</span>
          The contingencies of our business may, from time to time, require some
          change to your position and duties. We will consult with you before
          making any substantive changes to your position and duties.
        </p>
        <p>
          1.5 If significant changes are made to your position, you may request
          a revised job description.
        </p>
        <p>
          1.6 We will provide training as appropriately where new duties are
          required.
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
        <h3>Permanent employment</h3>
        <p>
          <span style={{ marginRight: "20px" }}> 1.7 </span>
          Your position is permanent, and we would like you to start work on the
          commencement date set out in schedule 1.
        </p>
        <p>
          <span style={{ marginRight: "20px" }}> 1.8 </span>
          Your employment will continue until it ends under the termination
          provisions of this agreement.
        </p>
        <p>
          <span style={{ marginRight: "20px" }}> 1.9 </span>
          The employment is only valid on the basis of your legal entitlement to
          work in New Zealand.
        </p>
        <p>
          <span style={{ marginRight: "20px" }}> 1.10 </span>
          Your employment is subject to the approval of the New Zealand
          immigration authority’s approval of your Visa transfer, successful
          business references, and if requested, a copy of your academic
          transcript.
        </p>
        <h3>
          <span style={{ marginRight: "20px" }}>2</span>Essential term
        </h3>
        <p>
          <span style={{ marginRight: "20px" }}>2.1 </span>
          It is an essential term of this agreement that:
          <p style={{ marginRight: "20px" }}>
            <span style={{ marginRight: "20px" }}>2.1.1</span>any representation
            or statement you made when applying for this position was true and
            complete; and
          </p>
          <p >
            <span style={{ marginRight: "20px" }}>2.1.2</span> you disclosed to
            us every matter which might materially influence our decision to
            employ you.
          </p>
        </p>
        <p>
          <span style={{ marginRight: "20px" }}>2.2 </span>
          If either of these conditions is not met, we may terminate the
          employment in accordance with the provisions of this agreement dealing
          with termination for serious misconduct
        </p>
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
              You will be on probation for a period of 6 (six) months from the
              date of joining us. On successful completion of your probation,
              you will be confirmed as a permanent employee of the company.
              During this period, either party may terminate this contract by
              giving forty-five (45) days’ notice in writing or salary in lieu
              thereof, at the sole discretion of the Company. Within ten (10)
              days after completion of 6 (six) months if you have not received a
              notification stating otherwise including, without limitation,
              extension of probation period from HR, your employment is deemed
              to be confirmed.
            </p>
          </>
        )}

        <p>
          After the expiry of the probation period or the extended probation
          period (if the same has been extended) either party is entitled to
          terminate the contract by giving Ninety (90) days’ notice. Whereas the
          Company reserves the right to request service of notice or pay salary
          in lieu of your notice period, waiver or payment in lieu will be at
          the sole discretion of the Company, but in no event will be less than
          the minimum period required by applicable law.
        </p>
        <p>
          For computing the probation period, your actual date of joining the
          Company shall be taken into consideration. Leave You will be governed
          by TSI India leave policy announced from time to time. Further details
          will be provided to you at the time of joining. Notice period.
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
            During notice period, leave will not be permitted except in case of
            medical emergency. Payment in lieu of unserved notice period will be
            recovered from the employee or notice period may get extended.
          </li>
          <li>
            At the time of termination of your employment contract, you are
            required to return to the Company in acceptable conditions all such
            properties of the Company which are in your possession.
          </li>
          <li>
            You agree that following the notice of termination of your
            employment, you shall cooperate fully with the Company and to the
            satisfaction of the Company in all matters relating to your 3
            employment with the Company and the orderly transition of such work
            to such other employees / persons as the Company may designate.
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
          terminated without any notice or salary in lieu thereof in the event
          of your involvement in any serious misconduct, nonappearance to work
          without any communication, misdemeanour or any offense which may or
          may not be directly connected with the business of the company. Other
          terms and conditions
        </p>
        <ul>
          <li>
            <p>
              During your employment, you will be subject to the service rules,
              regulations, and policy of the company applicable from time to
              time.
            </p>
          </li>
          <li>
            <p>
              The Company may, at its discretion conduct background checks prior
              to or after your expected joining date to validate your identity,
              the address provided by you, your education details, and details
              of your prior work experience if any, and to conduct any criminal
              checks. You expressly consent to the Company conducting such
              background checks. This offer will be cancelled and your
              employment with the company will be terminated with immediate
              effect, if any of the information provided by you is found to be
              false or misleading in the final background check report.
            </p>
          </li>
        </ul>

        <p>We certainly hope that you will be pleased with the foregoing.</p>
        <p>
          If you wish to accept this offer of employment with the Company, you
          must sign and return all the attached documents by no later than 07.00
          p.m. IST, {moment(formData.expiryDate).format("MMMM DD YYYY")}
        </p>
        <p>
          Please feel free to contact Jaishree Vignesh
          (jaishree.vignesh@tpfsoftware.com) if you have any questions or
          concerns.
        </p>
        <p>
          I accept this offer of employment and acknowledge that all the
          information I have provided in relation to my application for
          employment and capacity to undertake the role is true and correct and
          I understand that if I have provided any false or misleading
          information, TPF Software India Private Limited has the right to
          terminate the employment. I acknowledge that I have read and
          understood each term and condition set out in this appointment letter
          &amp; the enclosed Annexure and hereby agree, accept, and undertake to
          abide by all the aforesaid terms and conditions.
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
            change based on the insurance premium, FBP declaration, tax regime,
            and investment proof. Please note that the insurance premium is
            subject to change based on the annual insurance renewal.
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
              Basic - Is around 40% of the Annual CTC, it will be paid monthly
              through payroll and is subject to tax as per the prevailing income
              Tax rules.
            </li>
            <li>
              House Rent Allowance (HRA) – 50 % of the Annual Basic, it will be
              paid monthly through payroll. The tax exemption may be claimed on
              submission of rent receipt/ lease agreement as per the prevailing
              income tax rules.
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
              <strong> House Rent Allowance (HRA)</strong> – 50 % of the Annual
              Basic, it will be paid monthly through payroll. The tax exemption
              may be claimed on submission of rent receipt/ lease agreement as
              per the prevailing income tax rules.
            </li>
          </ul>
        </p>
        <h3>Insurance Benefits</h3>
        <p>
          <p>
            The benefit cost is subject to change year on year based on overall
            group premium cost any increase or decrease in the premium will be
            adjusted against CTC.
          </p>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>
              <strong>Group Term Life Insurance:</strong> This provides life
              coverage for the employee in case of any eventuality, for the sum
              insured of Minimum of INR 20,00,000 and Maximum of sum insured of
              3.5 times of Annual Fixed pay.
            </li>
            <li>
              <strong> Group Personal Accident:</strong> This provides you with
              round the clock financial protection in case of an accident in
              India, Coverage Limit: INR20,00,000 lakhs (Only for employee)
            </li>
          </ul>
        </p>
        <h3>Flexible benefit plan</h3>

        <p>
          Basket of various allowances/ expenses considered for Income Tax
          exemption. Under FBP, you will be granted Telephone and Internet
          Allowance, Books &amp; Periodicals Hostel Allowance, Non-transferable
          food coupons. Employees are given the option to decide which
          components they want to take and how much they want to take under each
          component with some predefined checks and balances.
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
    </>
  );
}
