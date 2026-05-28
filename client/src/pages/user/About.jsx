

const About = () => {

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">About Eventer</h1>
            <p className="text-lg mb-4">
                Eventer is a comprehensive event management platform designed to simplify the process of creating, managing, and attending events. Whether you're an event organizer or an attendee, Eventer provides a seamless experience for all your event-related needs.
            </p>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-lg mb-4">
                Our mission is to empower individuals and organizations to create memorable events with ease. We strive to provide a user-friendly platform that fosters community engagement and promotes successful event planning.
            </p>
            <h2 className="text-2xl font-semibold mb-3">Features</h2>
            <ul className="list-disc list-inside text-lg mb-4">
                <li>Easy event creation and management</li>
                <li>Seamless attendee experience</li>
                <li>Real-time collaboration tools</li>
                <li>Comprehensive analytics and reporting</li>
            </ul>
        </div>
    );
}

export default About;