import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/xayrbqry', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                form.reset(); // Reset the form fields after successful submission
                toast.success('Message sent successfully!');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container-xxl bg-white p-0">
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h5 className="section-title ff-secondary text-center text-primary fw-normal">
                            Contact Us
                        </h5>
                        <h1 className="mb-5">Contact For Any Query</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="row gy-4">
                                <div className="col-md-4">
                                    <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                                        Booking
                                    </h5>
                                    <p>
                                        <i className="fa fa-envelope-open text-primary me-2" />
                                        grancaffedm@gmail.com
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                                        General
                                    </h5>
                                    <p>
                                        <i className="fa fa-envelope-open text-primary me-2" />
                                        grancaffedm@gmail.com
                                    </p>
                                </div>
                                <div className="col-md-4">
                                    <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                                        Technical
                                    </h5>
                                    <p>
                                        <i className="fa fa-envelope-open text-primary me-2" />
                                        sadiquiabdullah4@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 wow fadeIn">
                            <iframe
                                className="position-relative rounded w-100 h-100"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1491519146816!2d55.27723049678952!3d25.19819210000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6998ed9e2f25%3A0x832a76f018b7b0af!2sGran%20Cafe!5e0!3m2!1sen!2sae!4v1709815203053!5m2!1sen!2sae"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="wow fadeInUp" data-wow-delay="0.2s">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Your Name"
                                                    required
                                                />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="_replyto"
                                                    placeholder="Your Email"
                                                    required
                                                />
                                                <label htmlFor="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="subject"
                                                    name="subject"
                                                    placeholder="Subject"
                                                    required
                                                />
                                                <label htmlFor="subject">Subject</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control"
                                                    id="message"
                                                    name="message"
                                                    placeholder="Leave a message here"
                                                    style={{ height: 150 }}
                                                    required
                                                />
                                                <label htmlFor="message">Message</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
