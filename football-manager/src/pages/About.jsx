import React from "react";

const About = () => {
    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-4">About Our Football Manager App</h1>
            <p className="text-lg mb-4">
                Our football manager app is designed for avid football fans who want to manage their own league, team, player, and position. With our app, users can easily set up their own league, create their own team, and manage their player positions. They can also view major leagues around the world and explore each team and player based on the selected season.
            </p>
            <p className="text-lg mb-4">
                We use the API-FOOTBALL service to provide the latest data on leagues, teams, and players. Our app provides users with a seamless and user-friendly experience that allows them to easily access the information they need to manage their own football league.
            </p>
            <p className="text-lg mb-4">
                Our team of developers is dedicated to providing our users with the best experience possible. We strive to continuously improve our app and add new features to enhance the user experience. Thank you for choosing our football manager app!
            </p>
        </div>
    );
};

export default About;