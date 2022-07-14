import Head from "next/head";
import Hero from "../components/hero";

import SectionTitle from "../components/sectionTitle";

import Footer from "../components/footer";
import Faq from "../components/faq";
import Roadmap from "../components/roadmap";
import MintInfo from "../components/mintinfo";
export default function Home() {
  return (
    <>
      <Head>
        <title>Moo World</title>
        <meta
          name="description"
          content="2000 Cows discovering the universe of Avalanche.
          But now they must exploit the biodiversity of these planets to survive!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      
      <MintInfo />

      <div className="overflow-y-hidden relative z-50" id="lore">
        <div className="mx-auto container py-6 px-4">
          <div className="w-full flex justify-center">
            <div className="w-full backdrop-blur-lg border-[1px] border-white/10  rounded-xl md:w-11/12 xl:w-10/12 bg-gradient-to-r from-indigo-300/10 to-blue/10 md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 xl:pb-8">
              <div className="grid overflow-hidden grid-cols-1 grid-rows-2 gap-5 grid-flow-row sm:grid-cols-1 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 ">
                <SectionTitle
                  pretitle="Lore"
                  title="The world of Moos"
                  align="left"
                >
                  In the year 2025, the Moo inhabit a post-apocalyptic world
                  where most life forms, including humanity, have been wiped
                  out. Originally modified by humans for increased milk
                  production and better reproduction, Moos are practically the
                  last survivors and inheritors of humanity's instinct. <br />{" "}
                  <br />
                  On a planet littered with remnants of a past life, the Moos
                  survive by exploring and seeking to evolve as a society. While
                  their incentives are not always aligned, Moo from all corners
                  of the world face extremely difficult odds and recognize that
                  their best chance of survival often lies in cooperation.
                </SectionTitle>
                <div className="flex flex-shrink-0 justify-center">
                  <img
                    src="https://media.discordapp.net/attachments/953101447388602388/959840901809700884/Untitled_04-02-2022_12-30-39.png?width=901&height=670"
                    alt="Moo World"
                    className=" rounded-xl shadow-xl border-[1px] border-white/20 w-full h-auto lg:h-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Roadmap />

      <Faq />

      <Footer />
    </>
  );
}
