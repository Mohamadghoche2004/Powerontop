import styled from "styled-components";

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StepCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9810fa 0%, #7c0fd9 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.75rem;
`;

const StepDescription = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.6;
`;

export const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Choose Your Product",
      description: "Explore our curated collection and discover products that match your style and needs.",
    },
    {
      number: 2,
      title: "Place Your Order",
      description: "Add your favorite items to the cart and complete the checkout process with ease.",
    },
    {
      number: 3,
      title: "We Deliver to Your Door",
      description: "Enjoy fast and reliable delivery service across Lebanon, right to your doorstep.",
    },
    {
      number: 4,
      title: "Pay on Delivery",
      description: "Pay securely with cash when you receive your order - simple and convenient.",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center h-full px-4 py-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
        How It Works
      </h1>
      <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
        Get your favorite products delivered to your door in just a few simple steps
      </p>
      <StepsContainer>
        {steps.map((step) => (
          <StepCard key={step.number}>
            <StepNumber>{step.number}</StepNumber>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </StepCard>
        ))}
      </StepsContainer>
    </div>
  );
};
