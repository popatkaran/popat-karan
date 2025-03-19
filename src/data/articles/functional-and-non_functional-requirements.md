---
slug: '/article/architecture/ibm/functional-and-non_functional-requirements'
date: '2023-02-16'
title: 'IBM - Functional and Non-Functional Requirements'
category: 'Software Architecture'
category_key: 'software_architecture'
type: 'professional'
image: '../../images/software-architecture.png'
order: 0
---

##### What is a functional requirement?
>
> A functional requirement addresses the client’s problem and what functions the system requires to solve that problem. Large systems can have hundreds of functional requirements.

##### What is a non-functional requirement?
>
> A non-functional requirement describes how the system must behave, rather than what it must do. Non-functional requirements are measurable and often related to performance, capacity, availability, and system recovery.

#### Questions to Ask

It is important to ask the clients the right kind of questions to draw out the requirements and fill any gaps in the system.

#### Questions to gather functional requirements

- How should a client interact with the system?
- What data must be captured?
- What data must be provided by the architect?
- What external/internal integrations are required for the system?
- Who are the system’s users?

#### Questions to gather non-functional requirements

- How available must the system be?
- How much data must the system store and for how long?
- How often must the system be backed up?
- What are the system’s security requirements?
- What are the system’s regulations and compliance requirements?
- What are the data residency requirements?
- Is there a disaster recovery requirement? If so, what are the Recovery Target Objective (RTO) and Recovery Point Objective (RPO) targets?
- What are the expected volumetrics details for the system?

#### Requirement Guidance

##### Gathering functional requirements

> Architects ask questions to fully understand the requirements. Clients may lack complete information or the ability to communicate complete information to the architect. When clients cannot supply functional information, architects must combine research, people skills, and suggestion of choices in order to understand what clients need.

> Clients often begin with a sense of what they want, which might not be the same as what they need. This distinction is sometimes expressed with the term MoSCoW: Must have, Should have, Could have, or Won't have. This MSCW or MoSCoW structure helps architects determine the best solution. When an architect organizes the client's wishes into these four categories, they set up a successful problem-solving process.

##### Gathering non-functional requirements
>
> What is the target availability for the system? (for instance: 99.9, 99.999)

> Even if the initial design is a minimal viable product (MVP), architects must understand what a final system will look like.

> Architects must make assumptions to progress without all the non-functional requirements in place. The earlier these assumptions are made into requirements, the more architects can rely on their decisions.
