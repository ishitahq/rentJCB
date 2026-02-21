# Welcome to RentJCB
### How to run frontend and backend
backend
```bash
cd backend
npm install
node index.js
```
frontend
```bash
cd frontend
npm install
npm run dev
```
### Assumptions 
- This first version is focused only on discovery and filtering.
- Booking workflows, payments, and vendor dashboards are intentionally out of scope.
- The provided dataset is static and represents the current list of machines available on the platform.

### Further Improvements
- Move from in-memory data to a proper database by introduce a persistent database layer (e.g., PostgreSQL) so machine listings and availability can be stored reliably and updated dynamically. This would allow vendors to manage their listings in real time instead of relying on static data.

- Introduce real-time availability handling as currently, availability is static. I would design a basic booking state model to prevent conflicts like reserved -> booked -> completed, ensuring multiple users cannot attempt to book the same machine simultaneously.

- Add pagination and performance optimization while the current dataset is small, in a real marketplace the machine list could grow significantly. I would implement pagination or lazy loading to ensure performance remains stable at scale.

- Separate filtering logic into reusable utilities. As filtering grows more complex, I would abstract filtering and sorting logic into separate utility functions or a service layer to keep the UI clean and maintainable.

- Vendor-side listing management by introduce a basic vendor dashboard where vendors can add, edit, and toggle availability of machines. This makes the platform multi-sided rather than just a browsing interface.

- Improve API structure for scalability. Instead of a single GET /machines, I would extend the API to support query parameters (e.g., /machines?category=Crane&location=Mumbai) so filtering can eventually be handled server-side for efficiency.
