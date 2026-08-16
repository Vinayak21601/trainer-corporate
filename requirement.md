

Assumption: under “Trainer page,” “a profile of Corporate” means a trainer profile.

## 1. User roles and landing experience

Add a prominent persona switch in the landing-page section:

- `I’m Corporate`
- `I’m a Trainer`

The selection changes the landing-page content without navigating immediately.

Corporate view:

1. “Find the right trainer for your team”
2. “Manage learning with complete visibility”
3. Corporate-focused testimonials
4. Featured corporate instructors
5. CTA: `Hire a Trainer` or `Create Requirement`

Trainer view:

1. “Grow your corporate training career”
2. Trainer benefits and platform workflow
3. Trainer-focused testimonials
4. Profile and availability preview
5. CTA: `Join as a Trainer`

The featured instructor cards should reuse the same card component shown on `/experts`, avoiding two inconsistent designs.

---

## 2. Authentication and onboarding

### Shared onboarding foundation

Create a Notion-style onboarding experience:

- One question per step
- Progress indicator
- Automatic draft saving
- Back and continue controls
- Skip only for optional questions
- Final review screen
- Mobile-friendly layout

Suggested routes:

- `/onboarding`
- `/onboarding/corporate`
- `/onboarding/trainer`
- `/onboarding/review`
- `/onboarding/success`

Account states:

- `draft`
- `submitted`
- `under_review`
- `changes_requested`
- `approved`
- `rejected`

---

## 3. Corporate onboarding

### Company information

Collect:

- Company legal name
- Brand/display name
- Company logo
- Website
- Industry
- Company size
- Headquarters and office locations
- Primary contact
- L&D contact details
- Preferred training locations
- Typical employee audience
- Training interests

### Billing and compliance

Collect:

- GST registration status
- GSTIN
- Registered business address
- Billing contact
- PAN or supporting business document if required
- Purchase-order requirements
- Invoice preferences

GSTIN should be validated structurally before submission. External GST verification can be added later if a trusted provider is selected.

### Review and approval

After submission:

1. Corporate profile enters `under_review`.
2. Internal administrator reviews company and GST details.
3. Administrator approves or requests changes.
4. Approval triggers an onboarding email.
5. User sees: “Congratulations, your company is now onboarded.”
6. User is directed to create the first training requirement.

---

## 4. Corporate workspace

Suggested routes:

- `/corporate/dashboard`
- `/corporate/company`
- `/corporate/requirements`
- `/corporate/requirements/new`
- `/corporate/requirements/[id]`
- `/corporate/trainers`
- `/corporate/engagements`
- `/corporate/feedback`
- `/corporate/billing`

Dashboard should show:

- Company logo and profile details
- Profile/verification status
- Active requirements
- Trainer matches
- Trainers shortlisted
- Trainers hired
- Upcoming training programs
- Completed engagements
- Pending feedback
- Recent communication
- Billing and GST details
- Notifications and required actions

### Post-training feedback

After an engagement is completed:

1. Corporate contact receives a feedback request.
2. Feedback is submitted for moderation.
3. Approved feedback appears on the trainer’s profile.
4. Trainer receives a notification.
5. Relevant transactional emails are triggered.

---

## 5. Corporate requirement workflow

The requirement form should be adapted to the final fields shared by email.

Proposed sections:

### Training need

- Requirement title
- Domain
- Topic and subtopics
- Learning objectives
- Target audience
- Participant count
- Current skill level
- Expected outcome

### Delivery requirements

- Delivery format: in-person, virtual, or hybrid
- Training city/location
- Preferred dates
- Alternative dates
- Duration
- Number of batches
- Language
- Accessibility requirements

### Commercial requirements

- Exact budget or budget range
- Budget flexibility
- Travel and accommodation coverage
- GST inclusion preference
- Payment terms

### Trainer preferences

- Minimum experience
- Industry experience
- Certifications
- Preferred trainer location
- Language
- Rating threshold
- Gender preference, only if legally and operationally appropriate
- Mandatory and optional criteria

Requirement states:

- `draft`
- `submitted`
- `matching`
- `matches_ready`
- `manual_review`
- `shortlisting`
- `trainer_selected`
- `closed`

---

## 6. Matching system

### Hard filters

First exclude trainers who fail mandatory requirements:

- Domain
- Required training location
- Delivery mode
- Availability on training dates
- Language
- Maximum budget where inflexible
- Required certification
- Minimum experience

### Weighted ranking

Rank the remaining trainers using an explainable score:

| Factor | Initial weight |
|---|---:|
| Domain and topic relevance | 30% |
| Date availability | 20% |
| Training location/delivery compatibility | 15% |
| Budget compatibility | 15% |
| Industry and audience experience | 10% |
| Rating and historical feedback | 5% |
| Language/certification preferences | 5% |

Budget handling:

- Exact match receives full points.
- Flexible budget permits configurable variance.
- Trainers beyond the permitted variance are excluded.
- Travel costs must be included when comparing in-person trainers.

Each result should explain the score, for example:

- “Strong domain match”
- “Available on all selected dates”
- “Within budget”
- “Location requires travel”
- “Relevant BFSI experience”

---

## 7. Immediate and manual matching

Use a hybrid workflow during the initial low-supply stage.

### Automated result

1. User submits a requirement.
2. Show a matching animation for 2–3 seconds.
3. If enough qualified trainers exist, display ranked results immediately.
4. Trigger an email containing the strongest matches.

### Manual result

If fewer than the minimum number of qualified trainers are found:

1. Requirement enters `manual_review`.
2. User sees: “We’re personally reviewing your requirement.”
3. Promise results within 24 hours.
4. Internal team receives a matching task.
5. Administrator attaches or approves trainers.
6. Corporate user receives an email when results are ready.

Avoid pretending that the system is still calculating for 24 hours; clearly distinguish automated matching from human-assisted matching.

---

## 8. Match results and trainer details

Requirement result page should provide:

- Ranked trainer cards
- Match percentage
- Match explanation
- Profile photo
- Professional title
- Domain and skills
- Experience
- Location
- Availability
- Delivery modes
- Languages
- Ratings and reviews
- Certifications
- Previous corporate clients
- Proposed rate
- Travel implications
- View profile
- Compare
- Shortlist
- Request discussion
- Hire/select trainer

Suggested routes:

- `/corporate/requirements/[id]/matches`
- `/corporate/requirements/[id]/compare`
- `/experts/[trainerId]`

---

## 9. Email and notification workflow

Transactional emails:

1. Corporate account created
2. Corporate profile submitted
3. Changes requested
4. Corporate profile approved
5. Requirement submitted
6. Automated matches ready
7. Manual matching started
8. Manual matches ready
9. Trainer shortlisted
10. Trainer selected
11. Engagement confirmed
12. Training reminder
13. Feedback requested
14. Feedback approved

Trainer emails:

1. Trainer registration
2. Profile submitted
3. Changes requested
4. Profile approved
5. New matching opportunity
6. Shortlisted by company
7. Discussion requested
8. Engagement confirmed
9. Feedback received

All emails should be queued, logged, retryable, and linked to in-app notifications.

---

## 10. Trainer onboarding

Suggested route: `/onboarding/trainer`

Collect:

- Name and profile image
- Professional headline
- Biography
- City and service locations
- Training domains
- Topics and skills
- Industries served
- Years of experience
- Delivery modes
- Languages
- Certifications
- Previous clients
- Workshop modules
- Day/hourly rate
- Travel preferences
- GST and invoicing details
- References
- Introductory video
- Supporting documents

After submission:

1. Trainer profile enters `under_review`.
2. Administrator verifies the details.
3. Administrator approves or requests updates.
4. Trainer receives email and in-app notifications.
5. Only approved profiles appear in search results.

---

## 11. Trainer profile completion

Add a profile-completion donut to the trainer portal.

Suggested categories:

- Basic details: 15%
- Profile photo and biography: 15%
- Domains and skills: 20%
- Experience and clients: 15%
- Programs/modules: 15%
- Certifications and documents: 10%
- Availability: 5%
- Billing/GST: 5%

The donut should provide actionable missing-item links rather than only displaying a percentage.

---

## 12. Trainer availability calendar

Suggested route: `/trainer-portal/availability`

Capabilities:

- Mark unavailable dates
- Mark available dates
- Block a date range
- Add recurring unavailable days
- Add partial-day availability
- Add travel buffers
- View confirmed engagements
- Prevent conflicts with confirmed bookings
- Set default notice period
- Set preferred working locations

Availability must be checked as a hard constraint during matching.

---

## 13. Administrative operations

An internal admin interface is required for the manual workflows:

- Review corporate profiles
- Review GST and company details
- Review trainer profiles
- Request profile changes
- Approve or reject accounts
- Review requirements
- Run or inspect matching
- Add trainers to manual results
- Approve feedback
- Monitor emails
- Manage domains, locations, and scoring weights

Suggested routes:

- `/admin/companies`
- `/admin/trainers`
- `/admin/requirements`
- `/admin/matches`
- `/admin/reviews`
- `/admin/emails`

---

## 14. Recommended delivery phases

### Phase 1 — Product foundation

- Persona switch and conditional landing sections
- Role-based authentication
- Database schema and account states
- Shared onboarding framework

### Phase 2 — Corporate MVP

- Corporate onboarding
- Company profile and GST details
- Corporate dashboard
- Requirement form
- Requirement status tracking

### Phase 3 — Trainer MVP

- Trainer onboarding
- Review workflow
- Profile-completion donut
- Trainer profile
- Availability calendar

### Phase 4 — Matching and results

- Hard-filter matching
- Weighted scoring
- Match explanations
- Automated results
- Manual 24-hour workflow
- Compare and shortlist tools

### Phase 5 — Operations

- Admin review interface
- Approval workflow
- Email automation
- In-app notifications
- Feedback and moderation

### Phase 6 — Quality and launch

- Responsive and accessibility testing
- Permission/security testing
- GST and billing validation
- Email delivery testing
- Matching-quality review
- Analytics and audit logs

The exact requirement fields from the referenced email should be finalized before Phase 4 so the database and matching model reflect the real business form.