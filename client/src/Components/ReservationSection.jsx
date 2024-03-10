import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReservationSection = () => {
    const [showModal, setShowModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        datetime: '',
        numberOfPeople: '1',
        specialRequest: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePlayClick = (videoSrc) => {
        setVideoUrl(videoSrc);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Stop the video when modal is closed
        setVideoUrl('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/mayrbewy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Handle success
                toast.success('Reservation submitted successfully');
                setFormData({
                    name: '',
                    email: '',
                    datetime: '',
                    numberOfPeople: '1',
                    specialRequest: ''
                });
            } else {
                // Handle failure
                toast.error('Failed to submit reservation');
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
            toast.error('An error occurred while submitting reservation');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="container-xxl py-5 px-0 wow fadeInUp" data-wow-delay="0.1s">
            <div className="row g-0">
                <div className="col-md-6">
                    <div className="video">
                        <button
                            type="button"
                            className="btn-play"
                            onClick={() => handlePlayClick('https://www.facebook.com/grancaffeuae/videos/cheers-to-the-weekend-catch-us-at-city-walk-2-t-052-342-7000/1610145962361238')}
                        >
                            <span></span>
                        </button>
                    </div>
                </div>
                <div className="col-md-6 bg-dark d-flex align-items-center">
                    <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
                        <h5 className="section-title ff-secondary text-start text-primary fw-normal">Reservation</h5>
                        <h1 className="text-white mb-4">Book A Table Online</h1>
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
                                            value={formData.name}
                                            onChange={handleInputChange}
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
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="email">Your Email</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating date" id="date3" data-target-input="nearest">
                                        <input
                                            type="text"
                                            className="form-control datetimepicker-input"
                                            id="datetime"
                                            name="datetime"
                                            placeholder="Date & Time"
                                            value={formData.datetime}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="datetime">Date & Time</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            id="select1"
                                            name="numberOfPeople"
                                            value={formData.numberOfPeople}
                                            onChange={handleInputChange}
                                        >
                                            <option value="1">People 1</option>
                                            <option value="2">People 2</option>
                                            <option value="3">People 3</option>
                                        </select>
                                        <label htmlFor="select1">No Of People</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea
                                            className="form-control"
                                            placeholder="Special Request"
                                            id="message"
                                            style={{ height: '100px' }}
                                            name="specialRequest"
                                            value={formData.specialRequest}
                                            onChange={handleInputChange}
                                        ></textarea>
                                        <label htmlFor="message">Special Request</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                <button className="btn btn-primary w-100 py-3" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Book Now'}
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content rounded-0">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Youtube Video</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="ratio ratio-16x9">
                                    <ReactPlayer
                                        url={videoUrl}
                                        controls
                                        width="100%"
                                        height="100%"
                                        playing={showModal}
                                        onPause={handleCloseModal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* End Modal */}
        </div>
    );
};

export default ReservationSection;
