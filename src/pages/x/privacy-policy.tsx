import { AiOutlineGithub } from "react-icons/ai";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col overflow-auto h-screen bg-[#fbfbfc]">
      <Head>
        <title>Scrawl</title>
      </Head>
      <div className="flex flex-col w-screen h-screen justify-left 2xl:justify-center items-center">
        <main className="flex flex-col items-left h-full w-full 2xl:w-3/5 p-12">
          <p className="text-5xl pb-8">🔏 Scrawl</p>
          <h1 className="text-2xl pb-6">Privacy Policy</h1>
          <p className="text-lg text-clip whitespace-pre-line break-words pb-4">
            This Privacy Policy document contains types of information that is
            collected and recorded by Scrawl and how we use it.
          </p>
          <p className="text-lg text-clip whitespace-pre-line break-words pb-4">
            We only ask for personal information when we truly need it to
            provide a service to you. We collect it by fair and lawful means,
            with your knowledge and consent. You are free to refuse our request
            for your personal information, with the understanding that we may be
            unable to provide you with some of your desired services.
          </p>
          <p className="text-lg text-clip whitespace-pre-line break-words pb-4">
            Scrawl uses{" "}
            <a
              className="text-blue-500 hover:underline"
              href="https://next-auth.js.org/"
            >
              NextAuth.js
            </a>{" "}
            to authenticate you as a user. To provide our services, we use
            NextAuth to gather your name, email and profile picture from GitHub.
            By signing in with GitHub, you consent to this data being collected.
            We use and store this information in order to provide you with our
            services. In order to use Scrawl, you accept that this identifiable
            information is stored by us. You can at any time opt-out of this
            data collection by deleting your account, options for which can by
            found in Scrawl&apos;s settings.
          </p>
          <p className="text-lg text-clip whitespace-pre-line break-words pb-4">
            We use cookies in order to provide you with Scrawl&apos;s services,
            this only includes the ability for us to know whether or not you are
            signed into Scrawl. We do not use cookies for any other purpose, and
            the cookies we do use are essential for the functionality of the
            app. By signing into Scrawl, you agree to our use of cookies.
          </p>
          <p className="text-lg text-clip whitespace-pre-line break-words pb-4">
            We also store any post (thought) you make and whether or not you
            have bookmarked them. This information is tied to your user account.
            You can delete your thoughts or bookmarks at any time, as well as
            your user account if you so wish.
          </p>
          <p className="text-lg text-clip whitespace-pre-line break-words pb-4">
            Scrawl is an open source project. It&apos;s source code is avaliable
            on{" "}
            <a
              className="text-blue-500 hover:underline"
              href="https://github.com/flynnjh/scrawl"
            >
              GitHub
            </a>{" "}
            under the MIT License, you or someone you trust can look at the
            source code to verify the claims of this privacy policy.
          </p>
          <p className="text-lg text-clip whitespace-pre-line break-words italic pb-4">
            This Privacy Policy affective as of 02/11/2022.
          </p>
          <Link href="/">
            <a className="text-blue-500 hover:underline">Back to Home.</a>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
