import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndCondition = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-br from-green-200 to-blue-300">
            <div className="mx-auto max-w-4xl p-4">
                <button
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring focus:border-green-400"
                    onClick={() => navigate('/sign-up')}
                >
                    <svg className="w-6 h-6 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center max-w-4xl mx-auto mt-5 p-4">
                <h1 className="text-3xl font-bold mb-8 text-neutral-600 tracking-wider">Terms and Conditions</h1>
                <p className="text-lg md:text-xl mb-4 text-neutral-700">
                    Welcome to Football Manager, a mobile application designed for football fans to create and manage their own leagues, teams, players, and positions. By using our app, you agree to the following terms and conditions.
                </p>
                <div className="w-full border-t border-neutral-500"></div>
                <div className="my-8">
                    <p className="text-lg md:text-xl font-semibold mb-4 text-neutral-900">Acceptance of Terms</p>
                    <p className="text-lg md:text-xl mb-4 text-neutral-700">
                        By accessing and using Football Manager, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions of Use, as well as any additional terms, policies, and guidelines referenced herein or available on our website.
                    </p>
                </div>
                <div className="w-full border-t border-neutral-500"></div>
                <div className="my-8">
                    <p className="text-lg md:text-xl font-semibold mb-4 text-neutral-900">Use of the App</p>
                    <p className="text-lg md:text-xl mb-4 text-neutral-700">
                        You may use Football Manager for personal, non-commercial purposes only. You agree to use the app in compliance with all applicable laws, regulations, and third-party agreements. You may not use the app to harass, defame, or harm others, or for any illegal or unauthorized purposes.
                    </p>
                </div>
                <div className="w-full border-t border-neutral-500"></div>
                <div className="my-8">
                    <p className="text-lg md:text-xl font-semibold mb-4 text-neutral-900">Intellectual Property</p>
                    <p className="text-lg md:text-xl mb-4 text-neutral-700">
                        The content and materials available on Football Manager, including but not limited to text, graphics, logos, images, and software, are the property of Football Manager and its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, display, or create derivative works based on any content or materials from the app without our prior written consent.
                    </p>
                </div>
                <div className="w-full border-t border-neutral-500"></div>
                <div className="my-8">
                    <p className="text-lg md:text-xl font-semibold mb-4 text-neutral-900">Third-Party Services</p>
                    <p className="text-lg md:text-xl mb-4 text-neutral-700">
                        Football Manager uses third-party services, including API-FOOTBALL, to provide users with access to league, team, and player information. You acknowledge and agree that any use of third-party services is subject to their respective terms and conditions.
                    </p>
                </div>
                <div className="w-full border-t border-neutral-500"></div>
                <div className="my-8">
                    <p className="text-lg md:text-xl font-semibold mb-4 text-neutral-900">Privacy Policy</p>
                    <p className="text-lg md:text-xl mb-4 text-neutral-700">
                        We respect your privacy and are committed to protecting your personal information. Please refer to our Privacy Policy for information on how we collect, use, and disclose personal information.
                    </p>
                </div>
                <div className="w-full border-t border-neutral-500"></div>
                <div className="my-8">
                    <p className="text-lg md:text-xl font-semibold mb-4 text-neutral-900">Changes to Terms and Conditions</p>
                    <p className="text-lg md:text-xl mb-4 text-neutral-700">
                        We may revise these Terms and Conditions of Use at any time without notice. By continuing to use Football Manager, you agree to be bound by the revised Terms and Conditions of Use.
                    </p>
                </div>
                <div className="w-full border-t border-neutral-500"></div>
                <div className="my-8">
                    <p className="text-lg md:text-xl font-semibold mb-4 text-neutral-900">Contact Us</p>
                    <p className="text-lg md:text-xl mb-4 text-neutral-700">
                        If you have any questions or concerns about these Terms and Conditions of Use, please contact us at
                        <span className="text-blue-500 cursor-pointer ml-1" onClick={() => window.location.href = 'mailto:braydenkim98@gmail.com'}>
                            braydenkim98@gmail.com
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default TermsAndCondition;
