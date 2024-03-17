import { NextApiRequest } from "next";

const mockQuestionData = [
  {
    id: "1",
    label: "How can you accumulate and use membership points with vani?",
    choices: [
      { id: "a", val: "Hand over membership card" },
      { id: "b", val: "Tell your Phone number" },
      { id: "c", val: "Show Vani Barcode on the Home screen" },
    ],
    answerAmount: 1,
    answer: ["c"],
    hint: "*To earn/use membership points with vani benefits, scan the Vani Barcode",
  },
  {
    id: "2",
    label:
      "What is an additional reward when you earn membership points with vani?",
    choices: [
      { id: "a", val: "Vani Point" },
      { id: "b", val: "Vani Coin" },
      { id: "c", val: "Vani Money" },
    ],
    answerAmount: 1,
    answer: ["b"],
    hint: "*Earn/use membership points with vani. Open Ice Cream. Get Vani Coins",
  },
  {
    id: "3",
    label: "There is another way to get Vani Coin. What is it?",
    choices: [
      { id: "a", val: "Leave a 1:1 inquiry" },
      { id: "b", val: "Run the vani app every day" },
      { id: "c", val: "Play Shake" },
    ],
    answerAmount: 1,
    answer: ["c"],
    hint: "*You can get additional Vani Coins when you play Shake once a day",
  },
  {
    id: "4",
    label: "How can you use Vani Coin?",
    choices: [
      { id: "a", val: "Exchange to Voucher" },
      { id: "b", val: "Buy a product at stores" },
      { id: "c", val: "Exchange to membership points" },
    ],
    answerAmount: 2,
    answer: ["a", "c"],
    hint: "*Your Vani Coins can be exchanged for other membership points or Vouchers",
  },
];

export function GET(req: NextApiRequest) {
  return Response.json({ data: mockQuestionData }, { status: 200 });
}
