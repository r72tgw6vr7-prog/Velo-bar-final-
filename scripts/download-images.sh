#!/bin/bash

# Download Images from Velo Bar Website
# This script downloads all images found on the current velo-bar.com site

# Create directories
mkdir -p public/images/gallery
mkdir -p public/images/events
mkdir -p public/images/team

echo "Starting image download..."

# Event Gallery Images
echo "Downloading gallery images..."
curl -o public/images/gallery/event-1.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/4235aba5-3a46-4345-b275-77dd6ed48417/DSC08454.JPG?format=2500w"
curl -o public/images/gallery/event-2.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/76fd3430-0fe7-455b-bcfe-cbf93bd2a7d1/DSC08457.JPG?format=2500w"
curl -o public/images/gallery/event-3.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/dd1409bf-48b5-451b-9648-0de3fe89f40b/DSC08461.JPG?format=2500w"
curl -o public/images/gallery/event-4.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/5858aa83-4f6a-4829-aaf7-bfdd9f6c90b3/DSC08531.JPG?format=2500w"
curl -o public/images/gallery/event-5.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/9481c44b-c782-4b81-9f60-260d38812eb8/DSC08571.JPG?format=2500w"
curl -o public/images/gallery/event-6.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/daa57acd-5f00-4ec1-b6a9-07420da427aa/DSC08640.JPG?format=2500w"
curl -o public/images/gallery/event-7.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/da349cb7-8842-4499-8229-47e2c633089b/DSC08679.JPG?format=2500w"
curl -o public/images/gallery/event-8.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/075f730a-cb71-4183-abc7-fa2be17b1a2e/DSC01995.JPG?format=2500w"
curl -o public/images/gallery/event-9.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/eda5e975-3bc1-4bb6-950d-caf3d9e9adc5/DSC02002.JPG?format=2500w"
curl -o public/images/gallery/event-10.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/71d5030e-b311-440c-9633-d354ef5e0209/DSC02013.JPG?format=2500w"
curl -o public/images/gallery/event-11.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/ae135585-69f3-44ca-a731-b2b184ef8517/DSC02026.JPG?format=2500w"

# Mobile Bar & Setup Images
echo "Downloading mobile bar images..."
curl -o public/images/events/mobile-bar-hero.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/1623488276870-2EFIOA5XODXFPBU00KAN/Mobile+Bar?format=2500w"
curl -o public/images/events/mobile-bar-setup.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/1623488340109-XL443BBGLPQNT0GASE5A/Mobile+Bar+Velo.Bar?format=2500w"
curl -o public/images/events/wedding-bar.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/1609326823718-N9798ZW43LI9PM0E0Q5D/Velo.Bar+M%C3%BCnchen-mobile+Bar+M%C3%BCnchen-Bar+f%C3%BCr+Hochzeit?format=2500w"
curl -o public/images/events/gin-tasting.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/1610609426028-FLRN494AMSLFFBE2Y4EQ/mobiles+Gin-Tasting+M%C3%BCnchen+mobile+Bar+m%C3%BCnchen?format=2500w"

# Team Photos
echo "Downloading team photos..."
curl -o public/images/team/lars-eggers.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/1609357596122-G6VAZSDQ0EP89ZLB96K2/DSC02560.jpg?format=2500w"
curl -o public/images/team/sebastian.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/1609357652906-F84LZLAX6W53ROFBZDFN/DSC02469.jpg?format=2500w"

# Drinks/Menu Image
echo "Downloading drinks images..."
curl -o public/images/events/drinks-selection.jpg "https://images.squarespace-cdn.com/content/v1/5feb08964b071c26bb0eb125/1611827006047-8BAFNMJ36E5AXJ3Y89NC/mobiles+Gin-Tasting+M%C3%BCnchen+mobile+Bar+m%C3%BCnchen?format=2500w"

echo ""
echo "[OK] Download complete!"
echo ""
echo "Images saved to:"
echo "  - public/images/gallery/ (11 event photos)"
echo "  - public/images/events/ (5 mobile bar photos)"
echo "  - public/images/team/ (2 team photos)"
echo ""
echo "Total images downloaded: 18"
