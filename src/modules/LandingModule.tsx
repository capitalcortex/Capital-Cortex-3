import React, { Suspense, useEffect, useState } from "react";
import FeatureCard from "@/components/Landing/FeatureCard";
import InfoCard from "@/components/Landing/InfoCard";
import SecurityFeatureCard from "@/components/Landing/SecurityFeatureCard";
import Button from "@/components/Buttons/Button";
import BoardCard from "@/components/Landing/BoardCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { userAddNewsletterAsync } from "@/services/user/aysncThunk";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import { Pagination } from "swiper/modules";
import { AiAssistant, Bespoke, SendIcon, Sourcing, Template } from "@/components/Icons";
import Image from "next/legacy/image";
const LandingModule = () => {
  const router = useRouter();
  const heroImg = "https://capitalcortstorage.blob.core.windows.net/app-assets/hero-img.png";
  const advisoryMember7 =
    "https://capitalcortstorage.blob.core.windows.net/app-assets/najmi_%20Rosita.webp";
  const advisoryMember1 =
    "https://capitalcortstorage.blob.core.windows.net/app-assets/jordan.jpg";
  const advisoryMember2 =
    "https://capitalcortstorage.blob.core.windows.net/app-assets/jeff.jpg";
  const advisoryMember3 =
    "https://capitalcortstorage.blob.core.windows.net/app-assets/eric.jpg";
  const advisoryMember4 =
    "https://capitalcortstorage.blob.core.windows.net/app-assets/amy.jpg";
  const advisoryMember5 =
    "https://capitalcortstorage.blob.core.windows.net/app-assets/hannah.webp";
  const advisoryMember6 =
    "https://capitalcortstorage.blob.core.windows.net/app-assets/cc/laure-mcGee.webp";
    const advisoryMember8 ="https://capitalcortstorage.blob.core.windows.net/app-assets/nilima.webp";
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // @ts-ignore
      dispatch(userAddNewsletterAsync({ email: values.email.toLowerCase() }));
      formik.resetForm();
      // Remove Query Params on Submission of Email
      router.replace("/", undefined, { shallow: true });
    },
  });
  useEffect(() => {
    setTimeout(() => {
      if (router.asPath.includes("#")) {
        var element = document.getElementById(
          router.asPath.replace("/#", "")
        ) as HTMLElement;
        element.scrollIntoView();
      }
    }, 1000);
  }, []);
  return (
    <div className="landing-page">
      {/* Banner/Hero Section */}
      <section id="banner" className="banner">
        <div className="main-container w-full flex justify-center">
          <div className="max-w-[53.5rem] pt-16 sm:pt-32 pb-4">
            <h1 className="landing-page-h1 leading-tight lg:leading-[5rem] tracking-wide text-white text-center !font-theme">
              AI Enhanced Public Policy and Government Affairs
            </h1>
          </div>
        </div>
        <div className="main-container max-w-[1360px] w-full flex justify-center relative">
          <figure className="landing-page-banner-img relative">
            <Image
              src={heroImg}
              width={1214}
              height={865}
              placeholder="blur"
              blurDataURL={heroImg}
              alt="hero"
            />
          </figure>
        </div>
      </section>

      {/* What is Capital Cortex Section */}
      <section id="about" className="section landing-page-about-us-section">
        <div className="main-container">
          <div className="md:grid md:grid-cols-12">
            <div className="sectionHead">
              <h2 className="landing-page-h2">What is Capital Cortex?</h2>
              <p className="landing-page-p text-start">
                {
                  "Capital Cortex is a civic technology project. 'Capital' represents our focus on capital cities, the epicenters of governmental power and decision-making. The 'Cortex' element, inspired by the brain's intricate operations, symbolizes the platform as a hub of intellectual and informational resources for our users. We seek to support users to gain a better understanding of political and policy landscapes, while improving the speed of research, and drafting of materials."
                }
              </p>
              <p className="landing-page-p text-start">
                {
                  "We make the complex political and bureaucratic networks and information understandable and navigable for everyday citizens, and the most experienced policy and government relations professionals."
                }
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              title="Data Integration"
              description="We amalgamate a wealth of public data sources encompassing legislative activities, economic indicators, national statistics, and other politically relevant data. Additionally, the platform integrates global data sets, crucial for those at the crossroads of national and international policymaking."
            />
            <InfoCard
              title="Generative AI"
              description="Leveraging a large language model, Capital Cortex empowers users to conduct in-depth analysis and generate insightful content. This AI-assisted approach simplifies complex data interpretation and content creation, making it more accessible to a broader audience."
            />
            <InfoCard
              title="Expert-Driven Know-How"
              description="Our platform is enriched with the logic and reasoning of seasoned experts in public policy and government affairs, ensuring high quality and relevant outputs."
            />
          </div>
        </div>
      </section>

      {/* Our Vision Section */}

      <section
        id="vision"
        className='section bg-[url("https://capitalcortstorage.blob.core.windows.net/app-assets/Vision.jpg")] bg-cover'
      >
        <div className="main-container">
          <div className="md:grid md:grid-cols-12">
            <div className="sectionHead text-white pb-0">
              <h2 className="landing-page-h2 !text-white">Our Vision</h2>
              <p className="landing-page-p text-start">
                We believe that a robust and well-informed civil society is the
                cornerstone of a healthy democracy. In our view, political
                knowledge should be accessible to all, not just a privilege for
                the few. Therefore, we are committed to ensuring that every
                voter has access to the same caliber of public policy and
                government affairs tools that are typically reserved for
                corporate entities and lobbyists.
              </p>
              <p className="landing-page-p text-start">
                To achieve this, Capital Cortex is dedicated to democratizing
                tools for analyzing public policy and government affairs. We
                recognize that existing market solutions are often
                cost-prohibitive for the average citizen, and at the same time,
                public data is scattered and challenging to interpret. With the
                advent of new technologies, we now have the means to offer more
                flexible and accessible tools to the public. Our goal is to
                harness these technological advancements to empower citizens,
                fostering a more informed, engaged, and equitable participation
                in the democratic process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="main-container">
          <div className="md:grid md:grid-cols-12">
            <div className="sectionHead">
              <h2 className="landing-page-h2 !mb-0">Features of Capital Cortex</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              active
              icon={<AiAssistant />}
              title="Personal AI Assistant"
              description="A thought and productivity partner enabling more efficient, and context specific content."
            />
            <FeatureCard
              icon={<Template />}
              title="A Menu of Templates"
              description="Built in structure, logic, and reasoning associated with several commonly used document types including end to end influencing strategies."
            />
            <FeatureCard
              icon={<Bespoke />}
              title="Bespoke Document Creation"
              description="Build your own custom document, with the ability to export to PDF and Word."
            />
            <FeatureCard
              icon={<Sourcing />}
              title="Sourcing"
              description="Content sourcing is transparent, and users are shown where responses are informed from."
            />
          </div>
          <p className="bg-theme-gray-75 p-6 gap-2 mt-6 inline-block">
            <span className="text-theme-red font-bold whitespace-nowrap pe-2">
              Upcoming Updates:
            </span>
            The team at Capital Cortex is building the platform for its users,
            and our first users will help shape the next set of features in our
            product roadmap, e.g. legislative tracking, stakeholder management
            tools, community features, etc.
          </p>
        </div>
      </section>

      {/* Security Infrastructure */}
      <section className='section bg-[url("https://capitalcortstorage.blob.core.windows.net/app-assets/security.jpg")] bg-cover'>
        <div className="main-container">
          <div className="md:grid md:grid-cols-12">
            <div className="sectionHead col-span-8 col-start-3 text-white">
              <h2 className="landing-page-h2 !text-white">
                Security and Trust
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* <SecurityFeatureCard
              img="https://capitalcortstorage.blob.core.windows.net/app-assets/transistor-icon.svg"
              title="Minimized Data Collection"
              description={`We collect only essential information for website functionality, ensuring personal and financial data stays off our servers. Gathered details—URLs, titles, and content summaries—are solely used to generate useful documents like summaries, outlines, notes, or citations.`}
            />
            <SecurityFeatureCard
              img="https://capitalcortstorage.blob.core.windows.net/app-assets/cloud-storage.svg"
              title="Secure Cloud Storage"
              description={`Your data resides on a secure cloud server—encrypted, firewall-protected, and utilizing HTTPS protocol for secure communication. Regular backups and updates are in place to prevent any potential data loss or corruption.`}
            />
            <SecurityFeatureCard
              img="https://capitalcortstorage.blob.core.windows.net/app-assets/recaptcha-icon.svg"
              title="Combatting Spam"
              description={`We've integrated reCAPTCHA to deter spam and abuse, providing an additional layer of protection against automated attacks or malicious scripts.`}
            /> */}
            <SecurityFeatureCard
              img="https://capitalcortstorage.blob.core.windows.net/app-assets/authentic-resources-icon.svg"
              title="Data Verification and Authentication"
              description={`We are committed to providing accurate and reliable information to our users. We exclusively source data from reputable entities across government bodies, academic institutions, and professional organizations to ensure the credibility and reliability of the information presented.`}
            />
            <SecurityFeatureCard
              img="https://capitalcortstorage.blob.core.windows.net/app-assets/Icon-5.svg"
              title="AI Ethics"
              description={`We are committed to upholding the highest standards governed by principles of fairness, transparency, accountability, privacy, and bias mitigation. We believe in leveraging information responsibly and for the betterment of society.`}
            />
            <SecurityFeatureCard
              img="https://capitalcortstorage.blob.core.windows.net/app-assets/shield-icon.svg"
              title="Data Security"
              description={`We collect only essential information necessary for our services and leverage best-in-class cloud-based services for fast, secure content delivery. Our security measures ensure that data is gathered and securely stored to maintain authenticity and integrity.`}
            />
          </div>
        </div>
      </section>

      {/* Advisory Board section */}
      <section id="advisory" className="section overflow-hidden">
        <div className="main-container">
          <div className="md:grid md:grid-cols-12">
            <div className="sectionHead col-span-8 col-start-3">
              <h2 className="landing-page-h2">Advisory Board</h2>
              <p className="landing-page-p text-start">
                {
                  "Capital Cortex is being supported by it's advisory board to ensure we are operating ethically, and produce outputs consistent with best in class public policy and government affairs work."
                }
              </p>
            </div>
          </div>
          <Swiper
            autoplay={true}
            speed={200}
            spaceBetween={24}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1240: {
                slidesPerView: 4,
              },
            }}
          >
            <SwiperSlide>
              <BoardCard
                id="advisory-member-7-img"
                img={advisoryMember7}
                name="Rosita Najmi"
                linksAbout={<div>Rosita Najmi is a development finance leader and driver of global social, environmental, and economic development innovations and outcomes since 2001. Rosita began her career as a social entrepreneur and co-founded a public health international NGO in West Africa. She has gone on to be a digitally fluent global executive and intrapreneur in the corporate world (PayPal and UPS), philanthropy (Bill & Melinda Gates Foundation and Omidyar Network), international development (World Bank), and civil society (Mercy Corps, Accion, America&apos;s Promise). She brings topical expertise in digital financial inclusion and economic empowerment, gender equality, and climate adaptation and resilience. Her functional track record includes leading strategy, impact measurement, grantmaking, data for good, impact investing, ESG (including DEI), CSR (including market-based approaches), humanitarian response, policy advocacy, learning, knowledge management, and field building. She has advised and led multi-stakeholder collaborations with governments, the private sector, civil society, and multilateral organizations, including the G7 and G20. She is a champion of collective action and has architected and led several innovative global partnerships, coalitions, networks, and alliances, including <a className="text-[#3397ff] underline" target="_blank" href="https://www.findevgateway.org/finequity/about-finequity">FinEquity, Climate Innovation for Adaptation and Resilience Alliance (CIFAR)</a>, Data2X <a className="text-[#3397ff] underline" target="_blank" href="https://data2x.org/financial-inclusion/">Women&apos;s Financial Inclusion Data Partnership</a> among others. She has funded and helped design and execute pioneering operational programs in regtech for regulators, privacy by design, and access to finance for people with disabilities. She created and served on the advisory board of the <a className="text-[#3397ff] underline" target="_blank" href="https://www.ictd.ac/programme/digitax/">DIGITAX Program</a> at the International Center for Tax and Development (ICTD), which has explored how tax policy can impact usage of digital financial services, and how digital financial services and digital ID can increase efficiency and equity of tax administration. Her early field research and publications explored female participation in microfinance and commercialization of microfinance. Rosita&apos;s geographic breadth includes Africa, South Asia, the Pacific, Central Europe, and East Asia, including experiences in Benin, Egypt, India, Indonesia, Israel, Japan, Jordan, Kazakhstan, Kenya, Mongolia, Philippines, Samoa, Tanzania, Uganda, and Vietnam. She earned an MBA from Harvard Business School and BA in Economics, French, and Politics from Wake Forest University. Her <a className="text-[#3397ff] underline" target="_blank" href="https://www.ted.com/talks/rosita_najmi_what_s_your_leadership_language?language=en">TED talk on multilingual leadership</a> has been translated in 8 languages. She lives in Washington, DC.</div>}
              />
            </SwiperSlide>
            <SwiperSlide>
              <BoardCard
                id="advisory-member-1-img"
                img={advisoryMember1}
                name="Jordan Deagle"
                about="Jordan is a member of the International Public Policy team at Amazon.com, where he focuses on competition and economic policy files for EMEA and APAC. Previously, he ran strategic communications and media relations for Amazon’s CEO, Andy Jassy. Prior to joining Amazon, Jordan spent five years working in the Office of the Prime Minister of Canada, most recently as Deputy Director of Communications for Prime Minister Trudeau. He is a Fellow of the Royal Canadian Geographical Society, and completed a Master’s degree in International Relations at the University of Toronto, where he was actively involved with the Canadian Centre for the Responsibility to Protect."
              />
            </SwiperSlide>
            <SwiperSlide>
              <BoardCard
                id="advisory-member-4-img"
                img={advisoryMember4}
                name="Amy Hepburn"
                about={`Amy Hepburn is the CEO of the Investor Leadership Network, a 2018 G7-born group of 14 asset managers and asset owners with over $10 trillion assets under management who are committed to accelerating the transition to a sustainable and inclusive global economy. Amy is a recognized impact investing expert and social entrepreneur with deep expertise on gender lens social investments and the care of children in crises. In this capacity, she has spent 20 years driving social change globally in the private,  non-profit and public sectors through the creation of unique public/private partnerships and investing for high impact social returns. Her partners include visionary leaders and influencers, governments, social entrepreneurs, non-profits, forward thinking companies, foundations and venture philanthropists seeking innovative solutions to persistent social issues. Amy was a Delegate on the first G7 Gender Equality Advisory Council created by Prime Minister Trudeau, and an active member of the NationSwell Council and The Global Women’s Forum on Economy and Society. She has Faculty appointments at Duke University and George Washington University where she teaches on social impact, gender equality, the just transition, intersectional climate justice, the care of children in crises, human rights and humanitarian action.`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <BoardCard
                id="advisory-member-2-img"
                img={advisoryMember2}
                name="Jeff Price"
                about={`Jeff currently serves as the Director of Team Member Platforms at ATB Financial, steering product development and software delivery, drawing upon over two decades of expertise in creating innovative software solutions and cultivating partnerships with vendors. He's played a pivotal role in shaping the CRM journey of ATB Wealth through multi-year, multimillion-dollar programs, enabling company growth and enhancing advisor experience. Jeff holds a User Experience certification from Nielsen Norman, Certified Financial Planner (CFP) accreditation , and is a graduate of the University of Calgary Haskayne School of Business with a Bachelor of Commerce.`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <BoardCard
                id="advisory-member-5-img"
                img={advisoryMember5}
                name="Hannah Cooper Klein"
                about={`Hannah Cooper Klein is the co-founder and CEO of Cooper/Smith a global organization that provides health systems intelligence. Over the past 20 years, she has advised governments on using data and technology to improve their citizens’ lives. She has worked at the World Bank, the United Nations, served as a policy advisor to several Canadian Cabinet Ministers, and led the Monitoring, Evaluation, and Quality team at the Office of the U.S. Global AIDS Coordinator, President’s Emergency Plan for AIDS Relief (PEPFAR), U.S. Department of State. Hannah founded Cooper/Smith in 2015 motivated by her passion for working with African governments to help them manage their healthcare programs with limited resources. She grew the business to a team of over 25 experts including data scientists, epidemiologists, AI specialists, behavioral economists, and software engineers. To date, she has raised over $30M dollars from private foundations, the US government, and multilateral institutions. Hannah is a Visiting Scholar at the University of Texas at Austin’s Center for Innovations for Peace & Development, an affiliate of Georgetown University’s Center for Innovation in Global Health, and participates in global health advisory and technical groups. She has published numerous think pieces and blog posts on AI, tech, and global development including in the New York Times.`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <BoardCard
                id="advisory-member-3-img"
                img={advisoryMember3}
                name="Eric Miller"
                about={`Eric Miller is President of Rideau Potomac Strategy Group, a Virginia-based consultancy that advises public and private sector clients globally on economic and regulatory policies, government affairs, business strategy, and geo-political matters. He has spent more than two decades at the intersection of government and business processes in the United States and Canada. Mr. Miller served as the first representative of Canada’s Department of Industry (ISED) in the United States. He also served as Vice President for North America and Cybersecurity at the Business Council of Canada – the Canadian CEO association. In addition, Mr. Miller has advised, negotiated with, and done projects with over 40 governments worldwide, including extensive work in Latin America and Asia. He has been a consultant to multilateral institutions and to leading global companies in a vast array of sectors ranging from mining, forestry, food, apparel, and tech. He is a Global Fellow at the Woodrow Wilson Center in Washington and Fellow with the Canadian Chamber of Commerce’s Future of Business Centre.`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <BoardCard
                id="advisory-member-6-img"
                img={advisoryMember6}
                name="Laure McGee"
                about={`Laura is the founder and CEO of Diversio, a tech startup that uses AI to help organizations become more inclusive. Diversio works with clients in 30 countries around the world, and has been featured at global events like the G20 and Davos. Prior to Diversio, Laura was a consultant at McKinsey & Company with a focus on economic growth. She was named a Top 25 Women of Influence in 2017 and currently serves as Co-Chair of Canada’s Expert Panel on Women Entrepreneurs. Board positions include ArcTern Ventures, Global Citizen, University of Waterloo, and Ted Rogers School of Management, and she is a David Rockefeller Fellow with the Trilateral Commission. She is a serial founder of social movements like #GoSponsorHer, #HackInclusion and Summit Leaders, and currently serves as Co-Chair of Canada’s Expert Panel on Women Entrepreneurs.`}
              />
            </SwiperSlide>
            <SwiperSlide>
              <BoardCard
                id="advisory-member-7-img"
                img={advisoryMember8}
                name="Nilima Gulrajani"
                about={`Nilima is a Senior Research Fellow in the Development and Public Finance team at ODI, a global affairs think tank based in London, UK.  She has over 20 years of experience working at the intersection of international public policy and research. In this role, she routinely advises and assesses the strategies and activities of governments. international organizations and philanthropic foundations. 
                Other roles include serving on the Board of CanWaCH, an alliance of Canadian civil society, academic and community organizations aiming to advance maternal and child health, Visiting Fellow at King’s College Department of International Development and an Associate Member of Trinity College, University of Toronto. 
                Before joining ODI, Nilima was an Assistant Professor at the London School of Economics where she taught public management and global development.  She has also previously worked as an international economist within the International Trade and Finance Group at the Canadian Ministry of Finance, the World Bank, and the International Development Research Centre.  She obtained her BA in Economics from McGill University and her PhD from Trinity College, Cambridge.`}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* Capital Cortex Beta/Contact Us */}
      <section id="beta_join" className="section bg-theme-gray-25">
        <div className="main-container">
          <div className="md:grid md:grid-cols-12">
            <div className="sectionHead col-span-6 col-start-4">
              <h2 className="landing-page-h2 !mb-4">Capital Cortex Beta</h2>
              <p className="landing-page-p text-start">Register your interest in Capital Cortex, and be among the first users to help shape the future of the platform.</p>
            </div>
          </div>
          <div className="md:grid md:grid-cols-12">
            <form onSubmit={formik.handleSubmit} className="col-span-10 col-start-2 lg:col-span-8 lg:col-start-3 relative">
              <input onChange={formik.handleChange} value={formik.values.email} type="email" name="email" placeholder="Enter your email" className={`theme-input !rounded-none py-6 pr-20 md:pr-[200px] pl-6 !h-auto ${formik.errors.email ? "text-theme-red" : "text-black"} bg-transparent`} />
              <Button disabled={!formik.isValid || formik.values.email === ""} type="submit" variant="theme-dark" size="large" className="!min-w-0 !md:min-w-[180px] absolute right-2 top-2 rounded-none !text-theme-gray-575 !font-bold">
                <span className="hidden md:block">Register Interest</span>
                <SendIcon className="relative h-6 w-6 md:hidden" stroke="currentColor" fill="#eeb127" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingModule;
