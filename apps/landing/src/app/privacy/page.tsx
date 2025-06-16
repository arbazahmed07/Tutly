import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutly | Privacy Policy",
  description: "Privacy Policy for Tutly",
};

function Page() {
  return (
    <div className="min-h-screen container mx-auto px-4">
      <div className="flex h-64 flex-col items-center justify-center gap-8 border-b border-gray-200">
        <h1 className="text-center text-4xl font-bold tracking-wider uppercase">
          Privacy Policy
        </h1>
        <h2 className="text-sm text-center font-medium text-gray-500">
          Last Updated: February 25, 2025
        </h2>
      </div>
      <div className="py-12 text-base font-light space-y-8">
        <p className="leading-relaxed">
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your personal information when you visit our websites,
          <Link href="https://tutly.in" className="font-semibold text-blue-500 hover:underline">
            tutly.in
          </Link>{" "}
          and{" "}
          <Link
            href="https://learn.tutly.in"
            className="font-semibold text-blue-500 hover:underline"
          >
            learn.tutly.in
          </Link>
          , or use our services. By accessing or using Tutly, you agree to the
          collection and use of your data as described in this Privacy Policy.
          If you do not agree with any part of this policy, you should refrain
          from using our services. <br />
          This Privacy Policy applies to all individuals interacting with our
          platform, including instructors who create and manage courses,
          students who enroll and participate in those courses, administrators
          overseeing operations, and visitors who access the website. We are
          dedicated to ensuring compliance with applicable data protection
          regulations, including the General Data Protection Regulation{" "}
          <span className="font-semibold">(GDPR)</span>, the California Consumer
          Privacy Act <span className="font-semibold">(CCPA)</span>, and the
          Indian IT Act 2000.
        </p>
        <div>
          <h2 className="text-xl font-bold tracking-wide uppercase mb-4">
            1. Information We Collect
          </h2>
          <p className="leading-relaxed mb-4">
            When you use Tutly, we collect various types of data to provide a
            seamless and efficient learning experience. This includes
            information that you provide directly, data collected automatically,
            and information received from third-party integrations.
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold tracking-wide uppercase mb-3">
                1.1 Personal Information Provided by Users
              </h3>
              <p className="leading-relaxed">
                When an instructor registers on Tutly, we collect essential
                details such as their full name, email address, institutional
                affiliation, and profile photo if uploaded. Instructors also
                provide course-related content, including assignments, study
                materials, and student progress reports. For students, we
                collect their name, email address, enrollment details, submitted
                assignments, grades, attendance records, and interactions with
                course materials. Additionally, when users communicate with us
                through email, support requests, or feedback forms, we collect
                their contact information and message details to resolve queries
                and enhance our services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-wide uppercase mb-3">
                1.2 Automatically Collected Data
              </h3>
              <p className="leading-relaxed">
                When users visit our platform, certain data is automatically
                collected to improve performance and security. This includes
                information such as IP addresses, browser type and version,
                operating system details, login timestamps, pages visited, and
                session duration. We also analyze behavioral data such as course
                completion rates, time spent on learning materials, and
                navigation patterns. This helps us optimize the platform
                experience and detect fraudulent activities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-wide uppercase mb-3">
                1.3 Information from Third-Party Integrations
              </h3>
              <p className="leading-relaxed">
                Tutly integrates with external services such as Google
                Authentication, payment processors, and analytics providers.
                When users log in using Google Sign-In, we receive their name
                and email address for authentication purposes. Payment
                transactions are handled through secure third-party providers,
                and we do not store credit card details or financial
                information.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide uppercase mb-4">
            2. How We Use Your Data
          </h2>
          <p className="leading-relaxed mb-4">
            The primary reason for collecting user data is to ensure the smooth
            operation of Tutly and provide a personalized learning experience.
            We use the information to create instructor accounts, enroll
            students, process assignments, and generate course-related
            statistics. Instructors are provided with student progress reports,
            submission details, and performance analytics to manage their
            courses effectively. <br />
            Beyond operational purposes, we utilize collected data to improve
            platform functionality, enhance user experience, and fix technical
            issues. By analyzing user behavior, we can optimize course
            recommendations and learning paths. We also use the information to
            detect unauthorized access attempts, prevent fraud, and comply with
            legal obligations. Additionally, we may send platform-related
            announcements, service updates, or promotional content, though users
            have the option to unsubscribe from non-essential communications at
            any time.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide uppercase mb-4">
            3. Data Sharing and Disclosure
          </h2>
          <p className="leading-relaxed mb-4">
            Tutly does not sell or rent user data to third parties. However, we
            may share specific data in cases where it is necessary for platform
            functionality or legal compliance. Instructors have access to
            relevant student data, such as course progress, assignment
            submissions, and attendance records, to evaluate and assist their
            students. <br /> In some cases, we may need to disclose user data to
            legal authorities if required by law, such as in response to court
            orders or government requests. Additionally, we work with
            third-party service providers for payment processing, analytics, and
            security enhancements. These entities are contractually bound to
            maintain the confidentiality of user information and use it solely
            for the intended purposes.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide uppercase mb-4">
            4. Data Security Measures
          </h2>
          <p className="leading-relaxed mb-4">
            We take data security seriously and implement advanced security
            measures to safeguard user information. All data transmissions on
            Tutly are encrypted using SSL/TLS encryption to prevent unauthorized
            access. We enforce strict access controls, ensuring that only
            authorized personnel can access sensitive data. Our platform is
            protected by firewalls and intrusion detection systems that
            continuously monitor for potential threats. <br /> Additionally, we
            conduct regular data backups to prevent data loss in case of system
            failures. While we strive to maintain the highest level of security,
            it is important to note that no online system can guarantee absolute
            protection. Users are encouraged to use strong passwords, enable
            two-factor authentication where possible, and report any suspicious
            activities related to their accounts.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide uppercase mb-4">
            5. Cookies and Tracking Technologies
          </h2>
          <p className="leading-relaxed mb-4">
            Tutly uses cookies and similar tracking technologies to enhance the
            user experience. Cookies help us remember user preferences, track
            login sessions securely, and analyze platform usage to improve
            functionality. These small data files are stored on users&apos; devices
            and allow for a smoother browsing experience. <br /> Users have the
            option to disable cookies through their browser settings. However,
            disabling certain cookies may limit access to some platform
            features, including personalized learning recommendations and
            session tracking.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide uppercase mb-4">
            6. User Rights and Data Control
          </h2>
          <p className="leading-relaxed mb-4">
            As a Tutly user, you have the right to access, modify, and delete
            your personal data. Instructors and students can update their
            profile information through the account settings page. If a user
            wishes to delete their account permanently, they can submit a
            request to <span className="text-blue-500">support@tutly.in</span>,
            and the process will be completed within{" "}
            <span className="font-semibold">14 days</span>. Users also have the
            right to opt out of promotional communications and control their
            notification preferences.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide uppercase mb-4">
            7. Data Retention Policy
          </h2>
          <p className="leading-relaxed mb-4">
            We retain user data for as long as it is necessary to provide our
            services. Instructor and student data remain stored as long as their
            respective courses are active. If an account remains inactive for 24
            months, it may be permanently deleted along with its associated
            data. However, certain records may be retained longer if required by
            law or for security purposes. Users can request early deletion of
            their accounts by contacting{" "}
            <span className="text-blue-500">support@tutly.in</span>.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide uppercase mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p className="leading-relaxed mb-4">
            Tutly reserves the right to update this Privacy Policy periodically.
            Any significant changes will be communicated through email
            notifications or platform announcements. Users are encouraged to
            review this policy regularly to stay informed about how their data
            is being handled. Continued use of the platform after policy updates
            constitutes acceptance of the revised terms.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide uppercase mb-4">
            9. Contact Information
          </h2>
          <p className="leading-relaxed">
            For any questions or concerns regarding this Privacy Policy, users
            can reach out to us at: <span className="text-blue-500">support@tutly.in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
