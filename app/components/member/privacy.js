import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import $          from 'jquery';

//component
import Footer     from '../common/Footer.js';

//javascript
import '../../public/javascripts/jquery.scrollbar.min.js';

@connect((state,props)=>{
  return{
    
  }
})

export default class Privacy extends React.Component{
  render(){
    return (
      <main className="content left">
        <article className="scrollbar-outer">
          <article className="in text">
            <div className="pageHeader">
              <div className="pageTitle">Privacy Policy</div>
            </div>
            <article className="block">
              <div id="about" className="content">
                <p>GINITUNE TAIWAN CO., LTD. (“We,” the service provider of GINITUNE,) take your personal privacy seriously and duly comply with the relevant privacy and personal data protection laws and regulations. Our Privacy and Personal Data Protection Policy (the “Policy”), which explains what personal data we collect and how to use such data, as well as other important matters related to your privacy, is set out below:</p>
                <h3>Collection of Personal Data</h3>
                <ul>
                  <li>When you register as a member of GINITUNE service, you will be required to enter certain information, including, but not limited to, an account ID (email address), name, gender, date of birth, contact number, place of residence, contact address, backup email address, occupation and favorite music type.</li>
                  <li>If you connect your account via Facebook or other services (“Third Party Service”), you agree us to collect your personal verification data and other data that may be accessible from your Third Party Service account, including your name, profile photos, country, email address, date of birth, gender, names of friends, and other personal pictures and social network. We may verify whether your data matches those collected from such Third Party Service and will store and use such data pursuant to the Policy.</li>
                  <li>When you use GINITUNE service, we may collect certain information, including:
                    <ul>
                      <li>information about your use of GINITUNE service, including history of use, and/or search; and/or</li>
                      <li>technical data, including URL, IP address, web browser type, operation system, language, and time of your visit, and we also use Cookie to provide the function of website.</li>
                    </ul>
                  </li>
                  <li>To properly and promptly provide you with GINITUNE service, you will be required to provide your account ID or personal contact information when using GINITUNE service, for example, application to change account details, provision of users’ feedback or participation in promotion activities.</li>
                </ul>
                <h3>Use of Personal Data</h3>
                <ul>
                  <li>The data collected under this Policy will be used as follows:
                    <ul>
                      <li>The basic personal data you provide (such as your name) will be used for the purpose of member identification; the contacted information you provide may be used for contacting you, notifying you promotional events, payment reminder, award notice, payment receipt notice, sending invoices, and/or other update notices related to GINITUNE service.</li>
                      <li>Information about your use and technical data may be used for the purpose of improving GINITUNE service, and/or developing new services.</li>
                      <li>We provide newsletter services and will send you marketing notices from time to time. If you do not wish to receive any newsletter or marketing notice, you can cancel the subscription service anytime by logging into your account. If you have any problem with the settings, you are welcome to contact our customer service anytime.</li>
                    </ul>
                  </li>
                  <li>We may share with third parties comprehensive non-personal data, which means the collected data has been sub-grouped and is not able to reflect or specify any identifiable individual.</li>
                  <li>The data collected herein may be processed and/or used by our affiliates or business partners or outside Taiwan. We will not use them for any other purposes unless the local laws provide otherwise, and will also not disclose them to any third party without your prior consent, unless the laws require so due to material national interests or for the purpose of facilitating law enforcement agencies’ investigations.</li>
                </ul>
                <h3>Management of Personal Data</h3>
                <ul>
                  <li>You are allowed to search, copy or change your own personal data. If you are not our member or we have not yet verified your membership, you are not allowed to search, copy, request for review or change the member’s personal data and account services of our accounts. For requests made in circumstances other than above, you would be required to provide your relevant personal data and written documentation as may be necessary to enable us to process your request.</li>
                  <li>You may request the use of your personal; data be suspended or your own personal data be deleted. However, once the use is suspended or data is deleted, you will no longer be able to use GINITUNE service.</li>
                  <li>We are entitled to refuse your request to change, delete or modify your personal data if such request may be harmful to the material national interests, result in impediment to the execution of statutory duties by government agencies, or cause any prejudice to the material interests of the collecting agency or third party.</li>
                </ul>
                <h3>Security of Personal Data</h3>
                <ul>
                  <li>We will provide all necessary technologies and measures to protect your personal data in order to safeguard your privacy.</li>
                  <li>To avoid information leakage, you should keep your own personal data, account ID and password, etc. in safe custody. To avoid misuse of your personal data, you should log out or close the software or internet browser after using GINITUNE services, whether you are using your own personal computer or not.</li>
                  <li>You should keep your payment particulars (including credit card details) in safe custody to avoid being used by others for illegal purpose.</li>
                  <li>GINITUNE service may include hyperlinks to third parties’ websites or webpages. We are not held jointly liable if you agree to allow those websites to collect, process, and/or use your personal data.</li>
                  <li>You agree to use true and accurate information for purchases on GINITUNE service. You should notify us immediately if you find your personal data has been misused by others or if you spot something abnormal.</li>
                  <li>You agree to provide and use lawful information when using GINITUNE services and all such information does not infringe any third party’s rights, violate any third party’s agreement or otherwise involve any illegal acts. If use of GINITUNE services causes any third party’s loss, we are not liable for such loss unless it is caused by us intentionally or due to our gross negligence.</li>
                </ul>
                <h3>Amendment of Privacy Policy</h3>
                <ul>
                  <li>We may update this Policy from time to time and comply with the relevant local privacy laws and regulations. When we make significant changes, we will make an announcement on our official website.</li>
                  <li>This Policy constitutes part of GINITUNE Terms of Service. If you do not agree any part of this Policy or any amended content, please stop using GINITUNE service immediately.</li>
                  <li>If you have any question regarding the Policy, please contact us at legal@GINITUNE.com</li>
                </ul>
              </div>
            </article>
            <Footer />
          </article>
        </article>
      </main>
    );
  }

  componentDidMount(){
    $(document).ready(function(){
      $('.scrollbar-outer').scrollbar();
    });
  }
}
