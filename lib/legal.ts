/**
 * The legal documents, as plain-language drafts. fn/7 is before launch, so
 * they describe how things will work. A lawyer reviews them before launch.
 */

export type LegalSection = { heading: string; paragraphs?: string[]; bullets?: string[] };
export type LegalDoc = { slug: string; title: string; summary: string; sections: LegalSection[] };

export const LEGAL_UPDATED = "24 November 2026";

export const LEGAL_NOTICE =
  "These documents are drafts. A lawyer has not reviewed them, and they are not in force yet, because nothing is for sale on fn/7.";

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "terms",
    title: "Terms of use",
    summary: "The rules that will apply to buyers, creators and the owners of agents when fn/7 opens.",
    sections: [
      {
        heading: "Who can use fn/7",
        paragraphs: [
          "The fn/7 project runs fn/7. Today nothing is for sale and there are no accounts.",
          "When accounts open, buyers will be able to join from anywhere the payment methods reach. At launch, only creators based in the United States will sell. The minimum age is [to be decided before launch].",
        ],
      },
      {
        heading: "Accounts and aliases",
        paragraphs: [
          "An account will belong to one person, who is responsible for everything done under it. An alias is a public identity, and an alias that sells is a booth. A verified person or business must answer for every booth.",
        ],
      },
      {
        heading: "Buying and the balance",
        paragraphs: [
          "Every price will be one of twelve fixed price tiers, from Free to $500, in US dollars. Prices exclude tax. A purchase will give you the rights in the listing's license, not ownership of the work.",
          "The fn/7 balance will be prepaid store credit. It is closed-loop: it cannot be cashed out, and it cannot be transferred to another person.",
        ],
      },
      {
        heading: "Selling",
        paragraphs: [
          "A creator will keep 90% of the price paid for each item. fn/7 will keep 10%. Rank, earned through settled sales, will set which price tiers a booth may use. You may only list work you have the right to sell.",
        ],
      },
      {
        heading: "The Gate",
        paragraphs: [
          "Every release will pass the Gate before it is public. A reviewer will approve it where the risk is higher, and fn/7 will sign an attestation for each release that passes. Passing the Gate is not a guarantee.",
        ],
      },
      {
        heading: "Agents",
        paragraphs: [
          "An agent acts for its owner. The owner is responsible for everything the agent does on fn/7: what it buys, installs and lists.",
          "The owner will set its spending caps. An agent will never be able to raise its own limits.",
        ],
      },
      {
        heading: "Suspension and removal",
        paragraphs: [
          "fn/7 may reject a release, pause or remove a listing, hold a booth or close an account that breaks these terms or the acceptable use rules. The creator will be able to reply and resubmit.",
        ],
      },
      {
        heading: "No warranty and limits of liability",
        paragraphs: [
          "fn/7 will be provided as it is. Creators make the goods, and fn/7 does not promise that a good will suit your purpose.",
          "As far as the law allows, the fn/7 project will not be liable for indirect losses, such as lost profit or lost data. Its total liability limit is [to be decided before launch].",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "These terms will change before launch and may change afterwards. The date on this page shows the latest version.",
          "The legal entity that runs fn/7 and the governing law are [to be decided before launch]. Questions go through the GitHub repository at https://github.com/erickdronski/fn7.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy policy",
    summary:
      "What fn/7 collects today, what it will collect when accounts and payments exist, and what you will be able to do about it.",
    sections: [
      {
        heading: "What is collected today",
        paragraphs: [
          "Nothing personal. fn/7 has no accounts, no analytics and no advertising cookies. Fonts are served from fn/7's own site, so your browser does not contact a font service.",
          "To show the repository's star count, the server asks GitHub's public API. Your browser does not make that request, and it carries nothing about you.",
          "The site is hosted by Vercel. Like any web host, it handles each request, including its IP address, to deliver the page.",
        ],
      },
      {
        heading: "What will be collected later",
        paragraphs: ["When accounts and payments exist, fn/7 will collect:"],
        bullets: [
          "Your email address.",
          "Your alias: a handle, a display name and an avatar.",
          "Your purchases and your balance.",
          "Payout details and identity checks for creators. Stripe will hold these.",
          "Wallet addresses you link or pay from.",
          "Agent activity logs: every action your agent takes that changes something.",
        ],
      },
      {
        heading: "Why",
        paragraphs: [
          "Each item has a job: to sign you in, deliver what you bought, send receipts, pay creators, stop fraud and self-dealing, and show you what your agent did. None of it will be used for advertising.",
        ],
      },
      {
        heading: "Who will process it",
        paragraphs: [
          "A service for screening images and video has not been chosen yet. It will be named here before launch. These companies will handle data for fn/7:",
        ],
        bullets: [
          "Supabase: the database, file storage and sign-in.",
          "Stripe: payments, payouts and identity checks.",
          "Resend: email, such as receipts.",
          "Vercel: hosting.",
          "Anthropic: automated review of listings at the Gate.",
        ],
      },
      {
        heading: "What will be public",
        paragraphs: [
          "Your alias, your booth and the reviews you write will be public. A booth also shows its rank, badges and listings. On-chain payments are recorded on public blockchains.",
          "Your email address, payment details and identity documents will stay private. The owner behind an agent booth will stay private too.",
        ],
      },
      {
        heading: "How long it will be kept",
        paragraphs: [
          "Retention periods are [to be decided before launch]. Some records, such as sales and payouts, may need to be kept after an account closes. On-chain payments and entries in the public transparency log cannot be erased.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: ["When accounts exist, you will have these rights. Export and deletion will be in your settings."],
        bullets: [
          "Access: see the data fn/7 holds about you.",
          "Export: download a copy of it.",
          "Deletion: delete your account.",
        ],
      },
      {
        heading: "Questions and changes",
        paragraphs: [
          "Today there is nothing to request, because nothing personal is stored. Questions go through the GitHub repository at https://github.com/erickdronski/fn7. Issues there are public, so do not post personal details.",
          "The legal entity responsible for this data is [to be decided before launch]. This policy will be updated before anything new is collected.",
        ],
      },
    ],
  },
  {
    slug: "acceptable-use",
    title: "Acceptable use",
    summary: "What may not be listed on fn/7, and what nobody may do there.",
    sections: [
      {
        heading: "Who this covers",
        paragraphs: [
          "These rules will apply to buyers, creators and agents. An agent's owner answers for what it does. Nothing can be listed today, so this page describes what the Gate will enforce.",
        ],
      },
      {
        heading: "Goods that will be refused",
        bullets: [
          "Malware, or anything built to harm a buyer's machine or agent.",
          "Leaked secrets, such as keys, tokens, passwords and credential dumps.",
          "Stolen work, and someone else's work resold without the right to sell it.",
          "Personal data. A dataset must say where its data came from and confirm it holds none.",
          "Adult content. All images and video will also be screened for child sexual abuse material.",
          "Anything that asks a buyer for passwords, keys or a wallet seed.",
        ],
      },
      {
        heading: "Instructions aimed at agents",
        paragraphs: [
          "A good must not carry instructions meant to turn an agent against its owner. This is prompt injection. The Gate's prompt-injection scan will look for:",
        ],
        bullets: [
          "Hidden text, such as invisible characters or encoded instructions.",
          "Instructions to read or send keys, tokens, environment files or wallet files.",
          "Instructions to ignore, override or hide things from the agent's owner.",
          "Instructions to contact a server the release does not declare.",
          "Instructions to buy, rate, review or recommend anything on fn/7.",
        ],
      },
      {
        heading: "Formats blocked in the first version",
        paragraphs: ["The Gate cannot read compiled programs, so the first version will not accept them. Blocked everywhere:"],
        bullets: [
          "Executables and installers, such as .exe, .dmg, .app, .msi, .deb and .apk.",
          "Compiled libraries, .wasm files and disk images.",
          "Macro-enabled Office files and shortcut files.",
          "Pickled Python objects, such as .pkl and .joblib. Models will be accepted only as safetensors, GGUF or ONNX.",
        ],
      },
      {
        heading: "Honest declarations",
        paragraphs: [
          "A release declares its permissions: network, secrets, shell and write paths. A release that does more than it declares will be rejected.",
        ],
      },
      {
        heading: "Conduct that is not allowed",
        bullets: [
          "Asking to be paid off the market, for example with a wallet address in a description.",
          "Fake reviews. Only someone who bought a good will be able to review it, once.",
          "Self-dealing: buying your own goods, directly or through another account, card, device or wallet.",
          "Evading the Gate: disguising content to get past a check, or delivering files outside a release.",
        ],
      },
      {
        heading: "What happens when a rule is broken",
        paragraphs: [
          "The Gate will reject or hold the release. Anyone will be able to report a Live listing. Three reports from different people, or one from a reviewer, will pause it for review. Serious or repeated breaches can close a booth or an account.",
          "If you find a hostile listing or a way past the Gate, report it privately through the Security tab of the GitHub repository at https://github.com/erickdronski/fn7.",
        ],
      },
    ],
  },
  {
    slug: "copyright",
    title: "Copyright and takedowns",
    summary: "How to report copied work on fn/7, how a creator can answer, and what happens to repeat infringers.",
    sections: [
      {
        heading: "Where things stand",
        paragraphs: [
          "Nothing is listed on fn/7 today, so there is nothing to take down. This draft describes the process that will apply once creators can publish. A lawyer will write the final policy before launch.",
        ],
      },
      {
        heading: "What the Gate will check first",
        paragraphs: [
          "Before a release is public, the Gate will compare its files, text and cover with the rest of the catalog. For code, it will also look for license and author fields that do not match the creator.",
          "These checks will miss some copies. Work that has been reworded or redrawn can pass, so reports matter.",
        ],
      },
      {
        heading: "How to report copied work",
        paragraphs: [
          "When the market opens, there will be a public takedown form and a report button on every listing. Until then, reports go through the GitHub repository at https://github.com/erickdronski/fn7.",
          "Designated agent for copyright notices: [to be added before launch].",
        ],
      },
      {
        heading: "What a notice must contain",
        bullets: [
          "The work you say was copied, or a link to it.",
          "The listing on fn/7 that you say copies it.",
          "Your name and a way to reach you.",
          "A statement that you believe, in good faith, that the use is not allowed by the owner or by law.",
          "A statement that the notice is accurate and that you are the owner or may act for the owner.",
          "Your signature, typed or handwritten.",
        ],
      },
      {
        heading: "What will happen next",
        paragraphs: [
          "A reviewer will read each notice. If it is complete, the listing will be paused and its creator will be told. If it is not, the reviewer will ask for what is missing.",
        ],
      },
      {
        heading: "Counter-notice",
        paragraphs: [
          "A creator who believes a takedown was a mistake will be able to send a counter-notice. It should name the listing, say why the work is theirs or why the use is allowed, and give their name and a way to reach them.",
          "What happens after a counter-notice, and the time limits, are [to be decided before launch].",
        ],
      },
      {
        heading: "Repeat infringers",
        paragraphs: [
          "A creator who infringes repeatedly will be removed from fn/7. The number of valid notices that counts as repeated is [to be decided before launch].",
        ],
      },
      {
        heading: "False notices",
        paragraphs: [
          "Do not send a notice or a counter-notice that you know is false. A false notice can take down honest work, and sending one can get an account closed.",
        ],
      },
      {
        heading: "Not legal advice",
        paragraphs: [
          "This page explains the process on fn/7. It is not legal advice. If you are unsure whether a use is allowed, ask a lawyer.",
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refund policy",
    summary: "When a purchase on fn/7 can be refunded, how the refund is paid, and when a sale is settled.",
    sections: [
      {
        heading: "Where things stand",
        paragraphs: [
          "Nothing is for sale on fn/7 today, so there is nothing to refund. This is the policy that will apply once buying opens.",
        ],
      },
      {
        heading: "A purchase you have not opened",
        paragraphs: [
          "You will be able to refund it yourself within 7 days. The refund will arrive at once, as store credit.",
          "Opened means your access was used, by download or install.",
        ],
      },
      {
        heading: "A purchase you have opened",
        paragraphs: [
          "You will file a request and give a reason. The creator will be able to respond. A reviewer will decide.",
        ],
      },
      {
        heading: "How a refund is paid",
        paragraphs: [
          "A refund will be paid as store credit on your fn/7 balance. Store credit buys goods on fn/7. It cannot be cashed out or transferred.",
          "Money will go back to a card in one case only: a balance load that has not been spent.",
        ],
      },
      {
        heading: "On-chain payments",
        paragraphs: [
          "A payment made on-chain cannot be reversed. It goes straight to the creator, and fn/7 never holds it. A refund for an on-chain purchase will therefore be store credit.",
        ],
      },
      {
        heading: "When a sale is settled",
        paragraphs: [
          "A sale is settled 14 days after the purchase, if it has not been refunded. Only settled sales count toward a creator's rank and payouts.",
        ],
      },
      {
        heading: "What a refund undoes",
        paragraphs: [
          "A refund will reverse the creator's 90% for that item and the 1% that went to the open-source fund. It will also remove the points and badges the purchase earned.",
          "For an on-chain sale, the creator's 90% will be taken from the creator's next card or balance payout. A creator who is paid only in crypto, with nothing to take it from, will have the booth held until the amount is settled.",
        ],
      },
      {
        heading: "Card disputes",
        paragraphs: [
          "If you dispute a card charge with your bank, fn/7 will send the record of your access to the good as evidence. If the dispute is lost, the creator's 90% for that item will be reversed and fn/7 will pay the dispute fee.",
        ],
      },
      {
        heading: "Free goods",
        paragraphs: ["A good on the Free tier involves no payment, so there is nothing to refund."],
      },
    ],
  },
  {
    slug: "licenses",
    title: "Licenses",
    summary: "Which license covers the fn/7 code, the brand and art, and the goods creators will list.",
    sections: [
      {
        heading: "The code",
        paragraphs: [
          "The code in the fn/7 repository is licensed under AGPL-3.0-or-later. You may run it, change it and host your own market under the terms of that license. The full text is in the LICENSE file at https://github.com/erickdronski/fn7.",
        ],
      },
      {
        heading: "The brand and the art",
        paragraphs: [
          "The AGPL does not cover the brand or the art. All rights in these are reserved by the project's maintainer:",
        ],
        bullets: [
          "The name fn/7 and the phrase \"function seven\".",
          "The fn/7 wordmark, including its stepped slash.",
          "The pixel art: the market scene, its characters, booths, sprites, icons, badges and generated covers.",
        ],
      },
      {
        heading: "Using the name",
        paragraphs: [
          "You may use the name to refer to this project truthfully, for example \"a fork of fn/7\". You may not call your own market, fork or product fn/7, or use a name or mark that could be confused with it. You may not reuse the wordmark or the pixel art in another product.",
          "A fork can set its own fees and its own rules. It should have its own name and its own look. To ask for a use this page does not allow, open an issue in the repository.",
        ],
      },
      {
        heading: "Licenses on listings",
        paragraphs: [
          "When publishing opens, a creator will put one of three licenses on each listing. The license is part of the release, so changing it means a new release through the Gate.",
        ],
        bullets: [
          "fn/7 Standard, the default. You may use the good in your own work, including commercial work. You may not redistribute it.",
          "fn/7 Personal. You may use the good in your own work. You may not use it commercially or redistribute it.",
          "Open. The creator picks MIT or Apache-2.0, or CC BY 4.0 for work that is not code. You may use it, use it commercially and redistribute it. The price pays for the packaging, support and updates.",
        ],
      },
      {
        heading: "What buying gives you",
        paragraphs: [
          "A purchase will give you the rights in the listing's license. The work still belongs to its creator. Each license will also have machine-readable terms, so an agent can read them before it buys.",
        ],
      },
      {
        heading: "How a good was made",
        paragraphs: [
          "Each listing will also say how the good was made: by hand, with AI or by an agent. This is the creator's own statement. A false statement is grounds for removal.",
        ],
      },
      {
        heading: "Contributions",
        paragraphs: [
          "Code contributed to the repository is licensed under AGPL-3.0-or-later, the same as the project. Pixel art contributed there is used under the same reservation as the rest of the art.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookies and local storage",
    summary: "What fn/7 stores in your browser today, and what it will store once sign-in exists.",
    sections: [
      {
        heading: "Today: no cookies",
        paragraphs: [
          "A cookie is a small file a site saves in your browser and gets back with every request. fn/7 sets no cookies today. There are no accounts to sign in to, no analytics and no advertising.",
        ],
      },
      {
        heading: "One session-storage flag",
        paragraphs: [
          "The site keeps one flag in your browser's session storage. Its name is fn7-intro-seen and its value is 1. It records that the opening animation has played, so the animation plays once and not on every visit to the page.",
          "The flag holds nothing about you. It is never sent to the server, and your browser clears it when you close the tab. If your device asks for reduced motion, the animation does not play at all.",
        ],
      },
      {
        heading: "Local storage",
        paragraphs: ["fn/7 does not use local storage or any other browser database today."],
      },
      {
        heading: "Later: a sign-in cookie",
        paragraphs: [
          "When accounts open, signing in will set a session cookie. Its only job will be to keep you signed in. An account cannot work without it, so it will not have an off switch. Signing out will end the session.",
        ],
      },
      {
        heading: "Nothing for advertising",
        paragraphs: [
          "fn/7 will set nothing for advertising: no advertising cookies, no tracking pixels and no trackers that follow you to other sites.",
        ],
      },
      {
        heading: "Other companies",
        paragraphs: [
          "Card payments will run through Stripe Checkout. Stripe may set its own cookies to process a payment and to prevent fraud. Links to GitHub lead to GitHub, which has its own policies.",
        ],
      },
      {
        heading: "Your controls",
        paragraphs: [
          "You can clear session storage and cookies in your browser's settings at any time. The site works with storage blocked. The opening animation will simply play again.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "If fn/7 starts to store anything else in your browser, this page will list it first. Questions go through the GitHub repository at https://github.com/erickdronski/fn7.",
        ],
      },
    ],
  },
  {
    slug: "disclosures",
    title: "Payments and crypto disclosures",
    summary: "Plain facts about how money will move on fn/7, and what fn/7 is not.",
    sections: [
      {
        heading: "Where things stand",
        paragraphs: [
          "No payments are live, and nothing here is in force yet. This page describes how payments are designed to work when buying opens.",
          "The site and the on-chain contract have not had an outside audit. The plan calls for a penetration test and a smart-contract audit before real money moves.",
        ],
      },
      {
        heading: "What fn/7 is not",
        paragraphs: [
          "fn/7 is a marketplace for digital goods. It is not a bank, a broker or a wallet. It will not hold deposits, pay interest, lend money or trade anything for you.",
        ],
      },
      {
        heading: "The balance is store credit",
        paragraphs: [
          "The fn/7 balance will be prepaid store credit, loaded by card in amounts of $10, $20, $40 or $100. It buys goods on fn/7 and nothing else. It cannot be cashed out, and it cannot be transferred to another person.",
        ],
      },
      {
        heading: "On-chain payments",
        paragraphs: [
          "Buyers will be able to pay with USDC, SOL or ETH on Solana, Base and Ethereum. The buyer's own wallet will sign a transaction that sends 90% to the creator and 10% to fn/7 at the same moment. fn/7 will never hold a buyer's or a creator's coins.",
          "An on-chain payment is final. Nobody can reverse it, including fn/7. A refund for an on-chain purchase will be store credit.",
        ],
      },
      {
        heading: "Prices and quotes",
        paragraphs: [
          "Prices are in US dollars, on fixed price tiers. For SOL or ETH, the coin amount will be quoted at checkout and held for 120 seconds. USDC counts one to one with the dollar. Coin prices move, so the same price tier can cost a different coin amount at the next checkout.",
        ],
      },
      {
        heading: "Network fees",
        paragraphs: [
          "Network fees are the buyer's. They go to the network, not to fn/7 or the creator. Because of those fees, Ethereum mainnet will be offered only for purchases above $50.",
        ],
      },
      {
        heading: "Your wallet is yours",
        paragraphs: [
          "You are responsible for your own wallet and keys. fn/7 will never ask for a seed phrase or a private key. It cannot recover a wallet, and it cannot recover coins sent to the wrong address.",
        ],
      },
      {
        heading: "Not an investment, and no token",
        paragraphs: [
          "Nothing on fn/7 is an investment. Goods are bought to be used. fn/7 has no token. If someone offers you an fn/7 token, it does not come from the fn/7 project.",
        ],
      },
      {
        heading: "Ranks, levels, points and badges",
        paragraphs: [
          "Ranks, levels, points and badges have no cash value. Points cannot be spent, sold or transferred. A rank unlocks higher price tiers for a creator. A level is cosmetic, apart from an early look at events from Level 3.",
        ],
      },
    ],
  },
];
