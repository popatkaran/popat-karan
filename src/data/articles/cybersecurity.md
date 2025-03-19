---
slug: "/article/cybersecurity"
date: "2023-07-27"
title: "Cybersecurity"
description: "Cybersecurity Series: Five Principles to Follow (and One to Avoid)"
category: "Cybersecurity"
category_key: 'cybersecurity'
type: "professional"
image: '../../images/cybersecurity.png'
order: 7
---

### Cybersecurity Principles

#### Defense in Depth

> Defense in depth is a security strategy that involves creating multiple layers of security to protect an organization's systems and data.

This strategy makes it more difficult for attackers to gain access to sensitive information, as they must bypass multiple security controls.

Some examples of defense in depth mechanisms include:

* Multifactor authentication
* Endpoint device management
* Firewalls
* Vulnerability scanning
* Data encryption

> By implementing defense in depth, organizations can significantly reduce their risk of being hacked.

#### Least Privilege

> The principle of least privilege states that users should only be granted the permissions they need to perform their job duties.

This principle helps to reduce the risk of unauthorized access to sensitive data and systems.

There are several ways to implement the principle of least privilege, including:

* Removal of unnecessary services and accounts
* Use of role-based access control
* Periodic review of user permissions

> By following the principle of least privilege, organizations can help to protect their data and systems from unauthorized access.

#### Separation of Duties

> Separation of duties is a security principle that requires that critical tasks be divided among multiple people, such that no single person can complete the entire task.

This helps to prevent fraud and unauthorized access, as it requires collusion between multiple individuals in order to complete a malicious act.

There are many ways to implement separation of duties, such as:

* Splitting up tasks
* Using role-based access control
* Implementing two-factor authentication

> By following the principle of separation of duties, organizations can help to protect their data and systems from unauthorized access.

#### Secure by Design

> Secure by design is the principle that security should be built into a system from the start, rather than being added as an afterthought.

* Increased security: By building security in from the start, organizations can help to reduce the number of vulnerabilities in their systems.
* Reduced costs: Secure by design can help to reduce the cost of security, as it can prevent the need for costly security patches and remediation efforts.
* Improved efficiency: Secure by design can help to improve the efficiency of security operations, as it can make it easier to identify and manage security risks.

#### Keep It Simple, Stupid (KISS)

> The KISS principle states that the simplest solution is usually the best.

* Increased security: Simple security measures are often more secure than complex measures, as they are less likely to be misconfigured or bypassed.
* Reduced costs: Simple security measures are often less expensive to implement and maintain than complex measures.
* Improved usability: Simple security measures are easier for users to understand and use, which can help to reduce the risk of human error.

### Security by Obscurity

> Security by obscurity is the principle of relying on some sort of secret knowledge in order to make a system safe.

* This principle is often used in cryptography, where a cryptosystem is designed to be secure even if its inner workings are known.
* However, security by obscurity is not a reliable security mechanism.
* If the secret knowledge is ever revealed, the system can be easily broken.
* Instead, security should be based on sound cryptographic principles, such as the use of strong algorithms and keys.

> Additional points

* **Hardening your systems:** Make your systems more secure by removing unnecessary services and hardening the operating system.
* **Re-certifying users:** Periodically review user access rights to make sure that they still need the access that they have been granted.
* **Eliminating privilege creep:** Remove access rights from users who no longer need them.
* **Force collusion:** Make it difficult for two or more people to work together to compromise your systems.

### Examples and scenarios

Here are some examples and scenarios to illustrate the points above:

* **Defense in depth:** A company might have a firewall to protect their network from outside attacks, but they also have antivirus software, intrusion detection systems, and other security measures in place. This way, if one security measure fails, the others will still protect the company's assets.
* **Least privilege:** A user who only needs to access a company's customer relationship management (CRM) system should only be given access to that system. They should not be given access to other systems, such as the company's financial systems, unless they need it for their job duties.
* **Separation of duties:** A company might have a process for approving new user accounts. In this process, one person would be responsible for creating the user account, and another person would be responsible for approving the account. This way, if one person is compromised, they cannot approve their own account and grant themselves access to the system.
* **Fail safe:** A company might have a system that is designed to fail safe in the event of a power outage. This means that the system will automatically shut down in a way that prevents data from being lost or corrupted.
* **Don't trust, verify:** A company might receive an email that appears to be from a legitimate source, such as a vendor or customer. However, the company should not trust the email without verifying its authenticity. They can do this by checking the sender's email address and looking for any suspicious signs, such as misspellings or grammatical errors.
* **Hardening your systems:** A company might have a system that is not properly hardened. This means that the system has not been configured to be as secure as possible. For example, the system might have unnecessary services running, or the operating system might not be up to date with the latest security patches.
* **Re-certifying users:** A company might have a process for re-certifying users. This means that users are periodically required to re-validate their need for access to certain systems or data. For example, a user might be granted access to a system when they first start working at the company. However, if the user no longer needs access to the system, they should be re-certified and their access should be revoked.
* **Eliminating privilege creep:** A company might have a system where users are granted more access than they actually need. This is known as privilege creep. For example, a user might be granted access to a system because they need to access a specific feature. However, the user is also granted access to other features that they do not need. This leaves the system vulnerable to attack.
* **Force collusion:** A company might have a system where two or more people are required to take action in order to complete a task. This is known as force collusion. For example, a user might need to approve a request before it can be processed. This makes it more difficult for an attacker to compromise the system, because they would need to compromise two or more accounts in order to complete the task.

### Conclusion

These are just a few of the cybersecurity principles that you should follow to protect your systems and data. By following these principles, you can make it more difficult for attackers to compromise your systems and steal your data.

---

### Confidentiality

> Confidentiality is the quality that information is not disclosed to unauthorized individuals, entities, or processes.

There are two main ways to ensure confidentiality:

* **Access control:** Access control is used to control who can access information and what they can do with it. This can be done through a variety of methods, such as user authentication, role-based access control, and least privilege.
* **Encryption:** Encryption is used to scramble information so that it cannot be read by unauthorized individuals. This can be done using a variety of encryption algorithms, such as symmetric encryption and asymmetric encryption.

### Integrity

> Integrity is the quality that information is not modified in an unauthorized way. This means that information should be accurate, complete, and consistent.

There are two main technologies that can be used to ensure integrity:

* **Digital signatures:** Digital signatures are used to verify the authenticity of a message and to ensure that it has not been modified. A digital signature is created using a private key and is verified using a public key.
* **Message authentication codes:** Message authentication codes (MACs) are used to verify the integrity of a message and to detect if it has been modified. A MAC is created using a secret key and is verified using the same secret key.

### Availability

> Availability is the quality that a system should be available to authorized users when they need it.

Denial of service (DoS) attacks are a type of attack that attempt to make a system unavailable to authorized users.

There are many different types of DoS attacks, including:

* SYN floods
* Reflection attacks
* Volumetric attacks

To protect against DoS attacks, systems can implement a variety of techniques, such as:

* Rate limiting
* Traffic shaping
* Firewalls

It is important to have a comprehensive security plan in place to protect against DoS attacks.

### Conclusion

> Confidentiality, integrity, and availability are the three main pillars of information security. By ensuring confidentiality, integrity, and availability, organizations can protect their sensitive information from unauthorized access, modification, or destruction.
---

## The Role of a Cybersecurity Architect and Their Domains

### Role and Mindset

The cybersecurity architect plays a crucial role in developing secure solutions. The process begins with stakeholders who have a vested interest in the success of the solution. Two examples illustrate this: a building architect and an IT architect working on an IT system. In both cases, stakeholders provide inputs to the architect, such as the type of building or the system's purpose.

The architect takes these inputs and creates a blueprint or an architecture overview diagram, which becomes the basis for implementation by specialized engineers or contractors. The architect focuses on safety and security, adding mitigations like locks, security cameras, firewalls, and encryption to make the architecture safer and more secure.

### Tools of the Trade

IT architects commonly use specific diagrams like the business context diagram, system context diagram, and architecture overview diagram to depict the system's components and relationships. For cybersecurity architects, these diagrams serve as a starting point to understand the system's functionality and envision potential failure points.

To further enhance security, cybersecurity architects rely on principles such as the CIA Triad (confidentiality, integrity, and availability) and frameworks like the Cybersecurity Framework from the National Institute of Standards and Technology (NIST). These frameworks provide comprehensive checklists to address security considerations in the identification, protection, detection, response, and recovery stages.

The best practice for cybersecurity architects is to engage them from the project's early stages, enabling them to perform risk analysis, develop security policies, and integrate security into the overall architecture.

### Domains of a Cybersecurity Architect

Cybersecurity architects operate in specific domains related to securing the system:

* **Identity and Access Management (IAM)**: Focuses on verifying users' identities and managing their access rights.
* **Endpoint Security**: Ensures the security of user devices and their trustworthiness within the system.
* **Network Security**: Protects the network infrastructure and prevents unauthorized access or data breaches.
* **Application Security**: Secures applications from potential vulnerabilities and attacks.
* **Data Security**: Ensures the protection and confidentiality of sensitive data stored in the system.
* **Security Information and Event Management (SIEM)**: Monitors and analyzes security-related events across the system for potential threats or breaches.
* **Incident Response (IR)**: Involves orchestrating the response to security incidents promptly and efficiently.

> These seven domains constitute the primary focus of a cybersecurity architect, and in the rest of the series, each domain will be explored in more detail.
---

### Identity and Access Management (IAM): Building a Secure Foundation

Identity and Access Management (IAM) plays a critical role in ensuring the security and integrity of an organization's digital assets. In this essay, we'll explore the key concepts of IAM, including the four As: Administration, Authentication, Authorization, and Audit. We'll also delve into the architecture of IAM and discuss its applications in various scenarios. Additionally, we'll touch on Consumer Identity and Access Management (CIAM) and the importance of extending IAM to other identity domains.

> The Four As of IAM

**Administration**:

* Determine access rights for users and create corresponding accounts.
* Establish roles for users based on their business functions, allowing for streamlined access provisioning.
* Implement role management to map user groups into IT roles, ensuring efficient access assignment.
* Utilize approval processes for granting access rights and maintain an audit trail for accountability.

**Authentication**:

* Authenticate users to answer the question, "Who are you?"
* Employ multi-factor authentication (MFA) with something the user knows, something the user has, and/or something the user is for enhanced security.
* Strive for passwordless authentication to reduce reliance on passwords and enhance user experience.
* Enable single sign-on (SSO) to provide users with a unified login experience across multiple systems.

**Authorization**:

* Determine what actions users are allowed to perform based on their roles and access rights.
* Implement risk-based authorization to assess contextual factors and adjust access privileges accordingly.
* Consider factors such as location, request type, amount, and frequency to determine access levels.
* Aim to strike a balance between security and usability, allowing appropriate access while mitigating risks.

**Audit**:

* Review and validate the accuracy of the previous three As (Administration, Authentication, and Authorization).
* Utilize user behavior analytics (UBA) to detect anomalies and potential security breaches.
* Maintain comprehensive logs of user activities for accountability and forensic purposes.
* Ensure that all access-related actions are monitored and logged to facilitate auditing and incident response.

> IAM Architecture and Integration

**Base Level: Store and Sync**

* Identify different user groups within the organization (e.g., employees, suppliers, customers).
* Group users based on business functions (e.g., administrative staff, manufacturing, sales).
* Store identity information in directories, often using LDAP (Lightweight Directory Access Protocol) as the industry-standard protocol.
* Consider Active Directory as Microsoft's version of a directory system, commonly used in Windows environments.
* In a real-world scenario, organizations may have multiple directories, necessitating synchronization capabilities to ensure consistency across systems.

**Administration and Role Management**

* Implement identity management or identity governance for administrative tasks.
* Use role management to map business roles to IT roles for efficient access provisioning.
* Employ approval workflows to grant access based on predefined roles and access rights.
* Provision and de-provision user accounts systematically to ensure security and efficiency.

**Authentication and Access Management**

* Utilize multi-factor authentication (MFA) with various factors (something the user knows, has, and is) for enhanced security.
* Implement single sign-on (SSO) for seamless user access across multiple systems.
* Consider risk-based authentication to adjust access privileges based on contextual factors.

**Privileged Access Management (PAM)**

* Securely manage privileged accounts with unique passwords, avoiding shared account/password practices.
* Use PAM systems to require users to log in through a centralized platform, granting temporary access to critical systems.
* Employ session recording to monitor privileged user activities and enhance accountability.

> Extending IAM: Federation and Consumer Identity and Access Management (CIAM)

**Federation**

* Extend IAM to other identity domains, allowing users to access external systems securely.
* Use industry-standard protocols for federation, enabling secure authentication and authorization across domains.

**Consumer Identity and Access Management (CIAM)**

* Tailor IAM for customer-facing systems to provide seamless and frictionless access.
* Prioritize user experience while preserving privacy and security.
* Streamline access provisioning for customers without compromising data protection.

### Conclusion

IAM is a foundational pillar in ensuring the security and efficiency of an organization's digital ecosystem. By focusing on the four As of IAM - Administration, Authentication, Authorization, and Audit - businesses can build a robust identity management framework. Employing role management, multi-factor authentication, single sign-on, and privileged access management can further enhance security. Federation and CIAM extend IAM's reach, allowing secure access across domains and ensuring a seamless user experience. IAM, when implemented effectively, fortifies an organization's defenses and fosters trust among users and stakeholders.

---
<https://www.youtube.com/watch?v=5uNifnVlBy4&list=PLOspHqNVtKADkWLFt9OcziQF7EatuANSY&index=5>
