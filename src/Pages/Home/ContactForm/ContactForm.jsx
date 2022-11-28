import React from 'react';
const ContactForm = () => {
    return (
        <section className='my-10 rounded-xl py-5'
            style={{
                backgroundImage: `linear-gradient(#8693AB,
                    #BDD4E7
                    ), url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOeXSQQsSPI2KPjoQp0kJ8vkUbOZ7Hcp6iug&usqp=CAU")`,

            }}
        >
            <div className="hero">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-lg text-primary text-center font-bold">Contact Us</h1>
                        <p className="text-4xl font-bold text-white">Stay connected with us</p>
                    </div>
                    <div className="card w-11/12">
                        <div className="card-body">
                            <div className="form-control">
                                <input type="text" placeholder="Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <input type="number" placeholder="mobile" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <input type="text" placeholder="Email Address" className="input input-bordered" />
                            </div>
                            <div className=" text-center mt-6">
                                <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;