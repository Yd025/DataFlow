# DataFlow

## Inspiration
The inspiration for DealFlow came from the growing need for accessible real estate investment analysis tools. As the real estate market becomes increasingly complex, both new and experienced investors need a way to quickly evaluate potential investments. 

## What it does
- Simplify complex financial calculations
- Provide instant insights into investment viability
- Make real estate analysis accessible to everyone
- Help investors make data-driven decisions

## How I Built It
- HTML5 for structure
- CSS3 for styling and animations
- JavaScript for calculations and interactivity

## What I Learned
Since I already know about web-design, I spent most of the time understanding financial calculations for this project, including:
- Implementing complex IRR calculations
- Understanding real estate investment metrics
- Building accurate cash flow projections

## Challenges Faced
I think that the hardest part of this comes from designing the UI interface and the many considerations such as:
- Making complex financial concepts accessible
- Creating an intuitive interface
- Balancing functionality with simplicity

# DealFlow: Real Estate Investment Analyzer

## Getting Started

### Prerequisites
- Node.js installed on your machine
- Git installed on your machine

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd DataFlow
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. Open your web browser and navigate to:
   http://localhost:3000

## Usage

### Manual Entry
Enter your property details directly into the form:
- Purchase Price
- Down Payment
- Closing Costs
- Monthly Rent
- Monthly Expenses
- Monthly Mortgage

### CSV Upload
1. Download the sample CSV template from the `uploads` folder
2. Modify the values to match your property
3. Upload the CSV file using the upload button

CSV Format:
```csv
price,downPayment,closingCosts,rent,expenses,mortgage
300000,60000,5000,2500,500,1200
```
