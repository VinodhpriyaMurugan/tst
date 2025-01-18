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
  ul:{
    listStyleType: "none",
    margin: "0",
    padding: "0",
    paddingLeft: "20px",
  }
};
export default function NzOfferLetter({ formData }) {
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
          <p>
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
        <div
          style={{
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.6",
          }}
        >
          <h2>2. Essential Term</h2>
          <p>
            <strong>2.1</strong> It is an essential term of this agreement that:
          </p>
          <div style={{ paddingLeft: "20px" }}>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>2.1.1</span>
              <span>
                Any representation or statement you made when applying for this
                position was true and complete; and
              </span>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>2.1.2</span>
              <span>
                You disclosed to us every matter which might materially
                influence our decision to employ you.
              </span>
            </div>
          </div>
          <p>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>2.2</span>
              <span>
                If either of these conditions is not met, we may terminate the
                employment in accordance with the provisions of this agreement
                dealing with termination for serious misconduct.
              </span>
            </div>
          </p>
          <h2>3. Duties</h2>
          <p>
            Your duties are set out in the attached job description. In addition
            to these duties, you agree to:
          </p>
          <div style={{ paddingLeft: "20px" }}>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>3.1.1</span>
              <span>
                Comply with any reasonable direction we give, our policies,
                procedures, and rules, and all legal requirements.
              </span>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>3.1.2</span>
              <span>
                Work exclusively for us and not have any interest in a business
                that competes with us, or do anything that may result in a
                conflict of interest.
              </span>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>3.1.3</span>
              <span>
                Tell us about any business opportunity that we may be able to
                take advantage of and do whatever we reasonably ask to take
                advantage of that business opportunity.
              </span>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>3.1.4</span>
              <span>Protect our reputation and other business interests.</span>
            </div>
          </div>
          <h2>4. Health and Safety</h2>
          <p>
            <strong>4.1</strong>
          </p>
          <div style={{ paddingLeft: "20px" }}>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>4.1</span>
              <span>
                We consider that it is a primary function of management to
                provide a safe working environment for our employees, and we
                will continue to take measures to safeguard your occupational
                health and safety.
              </span>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>4.2</span>
              <span>
                You understand that you have a responsibility to report in
                writing any condition or practice which may have become unsafe,
                in order that we can take appropriate and timely corrective
                action. You also accept responsibility to report to us in
                writing any condition or practice that you consider is or may be
                adversely affecting you.
              </span>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>4.3</span>
              <span>
                Please report to us as soon as practicable any accident or
                injury, no matter how minor that occurs to you in the workplace.
              </span>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>4.4</span>
              <span>
                You need to be aware that disregard of our health and safety
                policies may result in disciplinary action.
              </span>
            </div>
          </div>
        </div>
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
        <h2>5. Confidentiality</h2>
        <p>
          <strong>5.1</strong>You agree not to disclose any of our confidential
          information except where:
        </p>
        <div style={{ paddingLeft: "20px" }}>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.1.1</span>
            <span>the disclosure is required by law</span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.1.2</span>
            <span>
              the disclosure is necessary in connection with performing
              obligations under this agreement
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.1.3</span>
            <span>
              the disclosure is reasonably made to a professional legal adviser
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.1.4</span>
            <span>we consent in writing to the disclosure.</span>
          </div>
        </div>
        <p>
          <strong>5.2</strong> You agree not to disclose any of our confidential
          information except where:
        </p>
        <p>What information is confidential?</p>
        <p>
          <strong>5.3</strong> Confidential information includes:
        </p>
        <div style={{ paddingLeft: "20px" }}>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.3.1</span>
            <span>
              our trade secrets, know-how and technological information{" "}
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.3.2</span>
            <span>our client and supplier lists</span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.3.3</span>
            <span>information about our clients and suppliers</span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.3.4</span>
            <span>
              information about our administrative procedures and business
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.3.5</span>
            <span>
              our financial information - for example profit margins, costs and
              prices
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.3.6</span>
            <span>
              information about our business strategies and identified business
              opportunities
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.3.7</span>
            <span>our intellectual property</span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.3.8</span>
            <span>
              information which, if disclosed, might cause harm to our business
              or advantage a competitor
            </span>
          </div>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <span style={{ marginRight: "10px", flexShrink: 0 }}>5.3.9</span>
            <span>
              any other information which is confidential in fact or is regarded
              by us as confidential.
            </span>
          </div>
        </div>
        <div
          style={{
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.6",
            textAlign: "justify",
          }}
        >
          <h2>6. Intellectual Property</h2>
          <p>
            <strong>6.1</strong> We own any intellectual property that you
            discover, produce, or conceive which is related in any way to our
            business (whether or not it can be patented, can be subject to
            copyright, or can be protected in any other way). This includes
            intellectual property discovered, produced, or conceived:
          </p>
          <div style={{ paddingLeft: "20px" }}>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>6.1.1</span>
              <span>
                While working for us (whether or not it is during office hours
                or on the premises of us).
              </span>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>6.1.2</span>
              <span>
                After you have finished working for us, if it is based on
                something you worked on or became aware of while employed by us.
              </span>
            </div>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <span style={{ marginRight: "10px", flexShrink: 0 }}>6.1.3</span>
              <span>By using our confidential information.</span>
            </div>
          </div>
          <p>
            <strong>6.2</strong> You agree to promptly give us any assistance
            and information we require to allow us to take any steps to protect
            or enforce our intellectual property.
          </p>
          <p>
            <strong>6.3</strong> You appoint us as your attorney to do anything
            you are required to do under this clause.
          </p>
          <p>
            <strong>6.4</strong> Intellectual property includes the property
            rights to any information, data, discovery, improvement, design,
            documentation, business method, computer programming method,
            software, and other non-physical property.
          </p>
          <p>
            <strong>6.5</strong> The obligations regarding intellectual property
            continue to apply after the employment ends.
          </p>
        </div>
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
        <div
          style={{
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.6",
            textAlign: "justify",
          }}
        >
          <h2>7. Remuneration, Hours of Work, and Leave</h2>

          <h3>Total Remuneration Package</h3>
          <p>
            <strong>7.1</strong> We operate a Total Remuneration Package system.
            Your Total Remuneration Package is calculated on a combination of
            benefits, salary, and, if applicable, compulsory employer
            superannuation contributions to any KiwiSaver scheme or complying
            superannuation fund to which you belong either at the time you
            commence employment with us, or at any later date. The Total
            Remuneration Package for your position is specified in Schedule 1.
          </p>
          <p>
            <strong>7.2</strong> You agree that your Total Remuneration Package
            as specified in Schedule 1 includes all compulsory employer
            contributions to your KiwiSaver or other complying superannuation
            fund account, if applicable. You agree that this clause has been
            negotiated in good faith and complies with section 101B (4) of the
            KiwiSaver Act 2006.
          </p>
          <p>
            <strong>7.3</strong> Your salary may increase or reduce according to
            what benefits you and we agree you will receive, and whether you are
            or become or cease to be a KiwiSaver or complying superannuation
            fund member.
          </p>
          <p>
            <strong>7.4</strong> Your salary will be paid monthly via direct
            credit to your nominated bank account, with payments made on the
            last working day of each month. The duties of your position may
            require you to work hours additional to the standard hours of work.
            Your Total Remuneration is in full consideration of the requirements
            of your position in respect of hours and times of employment.
          </p>
          <p>
            <strong>7.5</strong> We will review your Total Remuneration package
            annually. Reviews will not necessarily result in an increase.
          </p>
          <p>
            <strong>7.6</strong> Please keep the information about your
            remuneration confidential.
          </p>
          <p>
            <strong>7.7</strong> The duties of your position may require you to
            work hours additional to the standard hours of work. Because your
            position is salaried, no additional payment will be made for those
            additional hours.
          </p>

          <h3>Hours of Work</h3>
          <p>
            <strong>7.8</strong> Your standard hours of work are recorded in
            Schedule 1. You will be entitled to (paid) rest and (unpaid) meal
            breaks in accordance with the Employment Relations Act 2000.
          </p>

          <h3>Deductions</h3>
          <p>
            <strong>7.9</strong> You authorize us to make deductions from your
            wages or holiday pay for any money you owe us and to make a ratable
            deduction from your salary for any time you are absent from work for
            other than periods of authorized paid leave.
          </p>

          <h3>Expenses</h3>
          <p>
            <strong>7.10</strong> We will reimburse you for reasonable business
            expenses specifically authorized by us in writing.
          </p>
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
