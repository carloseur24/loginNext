import Head from "../components/Head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlImage,
  MjmlSpacer,
} from "mjml-react"
import BulletedList from "../components/BulletedList"
import ButtonPrimary from "../components/ButtonPrimary"
import {
  leadingTight,
  leadingRelaxed,
  textBase,
  textXl,
} from "../components/theme"
const AccountCreated = () => (
  <Mjml>
    <Head />
    <MjmlBody width={600}>
      <Header big />
      <MjmlSection padding="0">
        <MjmlColumn>
          <MjmlImage
            cssClass="hero"
            padding="0 0 40px"
            align="left"
            src="https://s3.amazonaws.com/lab.campsh.com/welcome%402x.jpg"
          />
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection padding="0 24px 0" cssClass="smooth">
        <MjmlColumn>
          <MjmlText
            cssClass="paragraph"
            padding="0"
            fontSize={textXl}
            lineHeight={leadingTight}
          >
            Welcome, dear User!
          </MjmlText>
          <MjmlText
            padding="24px 0 16px"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            Thank you to register and to confidence in us!
          </MjmlText>
          <BulletedList
            items={[
              "You will enjoy our service all a month",
              "Our service aims to be the best option in ensuring the timely reminder of the activities of interest to you.",
              "You might change your reminder when you want without a limit",
              "You enjoy of a basic plan with 2 reminders but you can upgrade at any time to have many more.",
              "You Are completely free to leave you feedback",
            ]}
          />
          <MjmlSpacer height="24px" />
          <ButtonPrimary
            link={
              "https://dashboard-react-e1xk226s7-carloseur24.vercel.app/#/kanban"
            }
            uiText={"Go to App"}
          />
          <MjmlSpacer height="24px" />
          {/* <MjmlText
            cssClass="paragraph"
            padding="0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
          >
            Thank you for checking out our project. We’d love to hear your ideas
            on how we can make sending great emails more fun and simple.
          </MjmlText> */}
          {/* <MjmlText
            padding="16px 0 0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            ♥,
            <br />
            Mailing
          </MjmlText> */}
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </MjmlBody>
  </Mjml>
)

export default AccountCreated
