import styled from "styled-components";

const SectionContainer = styled.div`
  width: 100%;
  padding: 4rem 1rem;
  background: linear-gradient(135deg, #9810fa 0%, #7c0fd9 100%);
  color: white;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1rem;
  color: white;
`;

export const WhyChooseUsSection = () => {
  const features = [
    {
      title: "Free Delivery in Lebanon over $25",
      description: "Enjoy free delivery on all orders over $25 across Lebanon.",
    },
    {
      title: "Cash on Delivery",
      description: "Pay securely with cash when you receive your order.",
    },
    {
      title: "High Quality Products",
      description: "We curate only the finest products for our customers.",
    },
    {
      title: "Fast Support",
      description: "Get quick and reliable customer support whenever you need it.",
    },
  ];

  return (
    <SectionContainer>
      <ContentWrapper>
        <Title>Why Choose Us</Title>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <p style={{ marginTop: "0.5rem", color: "rgba(255, 255, 255, 0.9)", fontSize: "0.95rem" }}>
                {feature.description}
              </p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};
