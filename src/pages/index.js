import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import * as PageContent from "../pageContent";
import HomeSection from "./components/HomeSection/HomeSection";
import CarouselItem from "./components/Carousel/CarouselItem";
import CarouselArrow from "./components/Carousel/CarouselArrow";
import CarouselIndicator from "./components/Carousel/CarouselIndicator";
import { CAROUSEL_ITEMS } from "../carouselItems";

export default function Home() {  
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;


  const documentationCards = [
          { image: '/img/icons/hyak.jpg',
            header: 'Klone', 
            caption: 'Hyak Klone user guides',
            link: '/docs',
          },
          { image: '/img/icons/tillicum.jpg',
            header: 'Tillicum', 
            caption: 'Tillicum user guides',
            link: '/docs/tillicum/',
          },
          { image: '/img/icons/kopah.jpg',
            header: 'Kopah S3 Storage', 
            caption: 'Kopah user guides',
            link: '/docs/storage/kopah',
          },
          
        ];

  const learnCards = [
          { image: '/img/learn/homedir.jpg',
            header: 'Short How-To: Hyak Home Directories', 
            caption: 'Learn the basics of your home directory on Hyak. This video is ideal for new users getting started with Hyak.',
            link: 'https://youtu.be/h--muyCPFHs',
            isvideo: true,
          },
          { image: '/img/learn/linux101.jpg',
            header: 'Tutorial: Linux Basics', 
            caption: 'Become familiar with the Linux command-line interface and Hyak\'s file system.',
            link: '/docs/hyak101/basics/syllabus',
          },
          { image: '/img/learn/slurm.jpg',
            header: 'Tutorial: Slurm', 
            caption: 'Learn how to schedule your computing jobs with Slurm.',
            link: '/docs/hyak101/basics/syllabus_slurm',
          },
          { image: '/img/learn/containers.jpg',
            header: 'Tutorial: Containers', 
            caption: 'Discover containers and containerization of software for usage on Hyak.',
            link: '/docs/hyak101/containers/syllabus',
          },
          { image: '/img/learn/advancedslurm.jpg',
            header: 'Tutorial: Advanced Slurm', 
            caption: 'Worked example demonstrating the use of scripting with Slurm job arrays.',
            link: '/docs/hyak101/basics/syllabus_advanced',
          },
          { image: '/img/learn/ood.jpg',
            header: 'Tutorial: Open OnDemand', 
            caption: 'Open OnDemand is a web-based portal that allows you to use your favorite graphical software on our supercomputers.',
            link: '/docs/ood/start',
          },
        ];

  const highlightsCards = [
          { image: '/img/highlights/jayadevlab.jpg',
            header: 'Jayadev Lab', 
            caption: 'Advancing Alzheimer\'s Research with UW\'s Supercomputer',
            link: 'https://youtu.be/9w8A7FpDyRs',
            isvideo: true,
          },
          { image: '/img/highlights/cardss.jpg',
            header: 'Cardiac Systems Simulation Laboratory', 
            caption: 'Cardiovascular Disease and UW\'s Supercomputer',
            link: 'https://youtu.be/qpyin6iakLw',
            isvideo: true,
          },
          { image: '/img/highlights/qlora.jpg',
            header: 'QLoRA', 
            caption: 'Efficient Finetuning of Quantized LLMs',
            link: 'https://youtu.be/G8mn5SVgThA',
            isvideo: true,
          },
        ];      

  const supportCards = [
          { image: '/img/icons/help.jpg',
            header: 'Help Desk', 
            caption: 'Email help@uw.edu or use this form to let us know how we can help.',
            link: 'https://it.uw.edu/help/uw/',
          },
          { image: '/img/icons/officehour.jpg',
            header: 'Office Hours', 
            caption: '2X weekly drop-in or by appointment; in-person and remote.',
            link: 'https://calendar.washington.edu/sea_uwit-rc',
          },
          { image: '/img/icons/students.jpg',
            header: 'Research Computing Club', 
            caption: 'Free Hyak Access for Students + Join the RCC Slack Community.',
            link: 'https://depts.washington.edu/uwrcc/',
          },
        ];

  return (
    <Layout
      title={PageContent.HEAD_TITLE}
      description={PageContent.HEAD_DESC}
    >
      <Carousel 
        autoPlay={true} 
        infiniteLoop={true} 
        interval={8000} 
        showThumbs={false} 
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasNext, label) => {
          return <CarouselArrow
            onClickHandler={onClickHandler} 
            hasNext={hasNext} 
            label={label} 
            arrowDirection="left"
          />
        }}
        renderArrowNext={(onClickHandler, hasNext, label) => {
          return <CarouselArrow
            onClickHandler={onClickHandler} 
            hasNext={hasNext} 
            label={label} 
            arrowDirection="right"
          />
        }}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          return <CarouselIndicator
            onClickHandler={onClickHandler}
            isSelected={isSelected}
            index={index}
            label={label}
          />
        }}
      >
        {CAROUSEL_ITEMS.map((carouselItem, i) => {
          return <CarouselItem key={i} {...carouselItem} />
        })}
      </Carousel>

      <HomeSection
        header='Service Documentation'
        cards={documentationCards}
      />
      <HomeSection
        header='Learn'
        cards={learnCards}
      />
      <HomeSection
        header='Highlights'
        cards={highlightsCards}
      />
      <HomeSection
        header='Support'
        cards={supportCards}
      />
      <br/>
      <br/>
    </Layout>
  );
}
