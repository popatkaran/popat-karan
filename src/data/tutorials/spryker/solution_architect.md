---
slug: '/spryker/training/solution_architect'
date: '2023-03-01'
title: 'Solution Architect'
category: "spryker"
category_key: 'spryker'
type: 'professional'
image: '../../../images/platforms/banner-spryker.png'
order: 0
---

# Objective

- Describe who Solution Architect on Spryker projects is
- Define popular architecture design patterns like Observer, Composition, Lazy load, batching, etc. used on Spryker projects
- Explain what non-functional requirements (NFR) and Quality Attributes (QA) are
- Define NFRs for your client
- Name several capturing techniques and explain how they work

## Welcome

Here, you will be presented with instructions on how to get the most out of this course by using course navigation efficiently and learning how lessons are structured.

## Who Solution Architect is?

> Explains the difference between Enterprise, Solution and Technical Architects. Determines key job responsibilities of a Spryker Solution Architect.

### In the IT world you can meet different architects

- Technical Architects
- Solution Architects
- Enterprise Architects
  The exact responsibilities of those can vary from company to company, but the main idea should not.

#### What Exactly is the Difference?

The general difference is:

- Enterprise Architects guide a company’s business decisions by introducing effective IT strategies.
- Solution Architects investigate a specific issue or challenge and offer a solution.
- Technical Architects translate a solution into an integrated system, and provide in-depth technical expertise of hardware, software needs, etc.

### Read more about each type of architects in the following documentation

- [Differences between Enterprise Architects, Solution Architects and Technical Architects](https://www.leanix.net/en/wiki/ea/enterprise-architect-vs-solution-architect-vs-technical-architect-whats-the-difference#:~:text=While%20the%20enterprise%20architect%20focuses,implementation%20of%20a%20new%20application)
- [Enterprise Architect vs. Solution Architect vs. Technical Architect](https://www.interviewkickstart.com/blog/enterprise-architect-vs-solution-architect-vs-technical-architect#:~:text=An%20enterprise%20architect%20is%20more,designing%20and%20implementing%20technical%20solutions.)

### Solution Architect Responsibilities

In Spryker, a “specific issue or challenge” for Solution Architects usually affects entire project or a part of the project.

> This is a typical set of tasks that Spryker Solution Architects perform:

- Project Discovery
- Consultancy meetings
- Performance Review
  Of course, this can also vary from company to company.

## Design Patterns and Methods

> Names common design patterns and methods Solution Architects use daily.

### Spryker Layered Architecture

### Design Pattern - Observer (Event)

- Event observer
- Publish & Synchronise

### Design Pattern - Active Record (Entity)

The active record pattern is an approach to accessing data in a database. A database table or view is wrapped into a class. Thus, an object instance is tied to a single row in the table.

In Spryker, an entity represents one entry from a table in the database. Entities are an implementation of the active record design pattern, so their usage is very simple.

### Design Pattern - Composition Over Inheritance

Composition over inheritance (or composite reuse principle) in object-oriented programming (OOP) is the principle that classes should achieve polymorphic behavior and code reuse by their composition (by containing instances of other classes that implement the desired functionality) rather than inheritance from a base or parent class.

### Design Pattern - Lazy Loading

Lazy loading is a design pattern commonly used in computer programming and mostly in web design and development to defer initialisation of an object until the point at which it is needed. It can contribute to efficiency in the program's operation if properly and appropriately used.

For instance in Spryker we use lazy loading in Dependency providers.

### Design Pattern - Batch Processing

Computerized batch processing is a method of running software programs, called jobs, in batches automatically.

Apart from that we can process some data in batches as well.

In Spryker, we use batch processing in:

- Data Import
- Background jobs
- Some features implementation
- Others
- e.g. Spryker Batch Processing Implementation for Sync Storage Queue Messages.

### Design Pattern - Facade

The facade acts as an internal API. The main responsibility of the facade is to hide the internal implementation.

In Spryker, we use Facade in Zed Business Layer. Click on the tabs below to see more examples.

### Design Pattern - Factory

All modules are shipped with a dedicated factory for each layer. The responsibility of the factory is to create new instances of the classes from the same layer and module.

In Spryker, we use actory in different layers, for example, in Zed Business Layer.

### Design Pattern - Data Transfer Object

In programming, a data transfer object is an object that carries data between processes.

In Spryker, we use Transfer Objects—an implementation of the Data transfer Object.

### Design Pattern - Repository

A Repository mediates between the domain and data mapping layers, acting like an in-memory domain object collection. In Spryker we use a Repository in Zed Persistence Layer.

The repository in Spryker implements the repository pattern, which means you have a clear separation between business and persistence layers.

At Spryker, we use Propel as a main ORM.

Propel entities are not allowed outside the persistence layer. Here, we are using transfer objects instead. This separation enables switching to different database systems or ORMs, for example, you could even NoSQL to store your data.

### Design Pattern - Bridge

The bridge pattern is a design pattern used in software engineering that is meant to "decouple an abstraction from its implementation so that the two can vary independently",

In Spryker, we use Bridges to decouple dependent modules.

### Design Pattern - Scheduler

In computing, scheduling is the action of assigning resources to perform tasks. The resources may be processors, network links or expansion cards. The tasks may be threads, processes or data flows.

The scheduling activity is carried out by a process called a scheduler. Schedulers are often designed so as to keep all computer resources busy (as in load balancing), allow multiple users to share system resources effectively, or to achieve a target quality-of-service.

In Spryker, we use Scheduler and console commands.

### Design Pattern - Lock

In computer science, a lock or mutex (from mutual exclusion) is a synchronization primitive: a mechanism that enforces limits on access to a resource when there are many threads of execution. A lock is designed to enforce a mutual exclusion concurrency control policy, and, with a variety of possible methods, there exists multiple unique implementations for different applications.

In Spryker, we use locks in:

- Sessions
- OMS
  (Check Spryker\Zed\Oms\Business\Lock\TriggerLocker for more details)

## What do NFR and QA mean?

Explains importance of knowing non-functional requirements and quality attributes of a project.

**NFR** stands for **Non-Functional Requirements**.

In systems engineering and requirements engineering, a non-functional requirement (NFR) is a requirement that specifies criteria that can be used to judge the operation of a system, rather than specific behaviours. They are contrasted with functional requirements that define specific behavior or functions.

The plan for implementing functional requirements is detailed in the system design.

The plan for implementing non-functional requirements is detailed in the system architecture, because they are usually architecturally significant requirements.

### Why is it important to learn about NFRs?

Solution Architect is the key role in project scoping. If scope is poorly planned and implemented, it may lead to big project loss and failure in general. Keeping an eye on NFRs is one of the primary responsibilities of a Solution Architect.

### What does a Client say while scoping a project?

- Mentions Functional Requirements mainly
- Does not know/mention Non-functional Requirements

### What is expected from a Solution Architect?

- Pay attention to Functional Requirements mentioned by a Client
- Define important NFRs and ask a Client about those

### How to Define Important NFRs For a Client?

<details>
<summary>Know all the Non-functional Requirements</summary>
Action:

Check all known NFRs in software development, and learn what they mean.

Example:

- Accessibility
- Adaptability
- Auditability and control
- Availability
- And so on...

</details>

<details>
<summary>Know most common NFRs for a specific business case</summary>
Action:

Analyse your previous experience
What was important in your previous projects?
Did you have any escalations related to NFRs?
What would you expect from E-Commerce website you use?
Example:

E-Commerce:

- Security
- Performance
- Availability
- Read more [here](https://elogic.co/blog/functional-and-non-functional-requirements-for-ecommerce-websites/) and [here](https://elogic.co/blog/functional-and-non-functional-requirements-for-ecommerce-websites/)

Gaming:

Performance
General:

PASSME (Performance, Availability, Security, Scalability, Maintainability, Extensibility)

</details>

<details><summary>
Define NFRs that will help a Client with their business</summary>
Action:

Analyze Client business and their goals
Define NFRs that can help a Client to reach their goals
Example:

A Client who sells high performance website hosting:

- Performance

A Client who has low number of products and customers, but can not oversell products:

- Data integrity

</details>

### What is a QA?

> QA relates to the Quality Attributes.

Within systems engineering, quality attributes are realized non-functional requirements used to evaluate the performance of a system. These are sometimes named architecture characteristics, or "ilities" after the suffix many of the words share. They are usually Architecturally Significant Requirements that require architects' attention.

## Capturing Techniques

Describes what Solution Architects use to design architecture, OMS process and so on.

### UMLs

Sometimes creating amazing architecture is not enough. The capturing of the architecture is as important as creating it. If no one understands your architecture - no one will implement it.

The Unified Modeling Language (UML) is a general-purpose, developmental modeling language in the field of software engineering that is intended to provide a standard way to visualize the design of a system.

- Structure diagrams
- Behavior diagrams

### C4 model

The C4 model is a lean graphical notation technique for modelling the architecture of software systems.

It consists of 4 levels:

- Context (such as Target architecture diagram)
- Container (such as Cloud set up, services set up, or platform with PBCs)
- Component (High level technical specification, modules level)
- Code (Detailed technical specification, classes level)

### 4 plus 1

4+1 is a view model used for "describing the architecture of software-intensive systems, based on the use of multiple, concurrent views". The views are used to describe the system from the viewpoint of different stakeholders, such as end-users, developers, system engineers, and project managers.

The four views of the model are:

- Logical
- Development
- Process
- Physical

In addition, selected use cases or scenarios are used to illustrate the architecture serving as the 'plus one' view. Hence, the model contains 4+1 views.

## Key Takeaways

Summarises what we've learned in this course.
