import React, { useRef } from 'react'
import styles from './Contact.module.scss'
import Card from '../../components/Card'
import {FaPhoneAlt,FaEnvelope,FaTwitter} from "react-icons/fa"
import {GoLocation} from "react-icons/go"
import emailjs from "@emailjs/browser"
import { toast } from 'react-toastify'


function Contact() {
  const form=useRef();

  const sendEmail=(e)=>{
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID,
    process.env.REACT_APP_EMAILJS_SERVIVE_TEMPLATED_ID,form.current,process.env.EMAILJS_PB_KEY)
    .then((result)=>{
      toast.success("Message sent successfully")
    },(error)=>{
      toast.error(error.text)
    })
    e.target.reset();
  }
  return (
    
    <section>
      <div className={`container ${styles.contact}`}></div>
      <h2>Contact Us</h2>
      <div className={styles.section}>
        <form  ref={form} onSubmit={sendEmail}>
          <Card className={styles.card}>
            <label>Name</label>
            <input type='text' name='user_name' placeholder='Full Name' required/><br/>
            <label>Email</label>
            <input type='email' name='user_email' placeholder='Enter Your Active Email' required/><br/>
            <label>Subject</label>
            <input type='text' name='subject' placeholder='Enter Your Subject' required/><br/>
            <label>Message</label><br/>
            <textarea name='message' cols="30" rows="10" placeholder='PLease Write Here' required/><br/>
            <button>Send Message</button>
          </Card>
        </form>
        <div className={styles.details}>
          <Card className={styles.card2}>
            <h3>Our Contact Information</h3>
            <p>Fill the form or contact via the options listed below</p>
            <div className={styles.icons}>
              <span>
                <FaPhoneAlt/>
                <p>+91-8899850117</p>
              </span>
              <span>
                <FaEnvelope/>
                <p>aashishgupta210901@gmail.com</p>
              </span>
              <span>
                <GoLocation/>
                <p>Jammu,Jammu & Kashmir(INDIA)</p>
              </span>
              <span>
                <FaTwitter/>
                <p>@2109Aashish</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Contact