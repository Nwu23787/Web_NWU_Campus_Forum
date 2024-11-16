/**
 * @typedef {import('mdast').Root} Root
 * 
 * @typedef {import('mdast').PhrasingContent} PhrasingContent
 *
 * @typedef {import('mdast-util-find-and-replace').ReplaceFunction} ReplaceFunction
 *
 * @typedef Options
 *  Configuration
 * @property {(username: string) => string} usernameLink
 */

import { findAndReplace} from "mdast-util-find-and-replace";
import { queryMentionUser } from "../requestAPI";
import { User } from "@/types";
import { AxiosResponse } from "axios";
import axiosInstance from "../http";

//const userGroup = "[\\da-z][-\\da-z_]{0,30}";

const userGroup = "[^\\s^@#\\!\\\\]{1,30}";//排除 @ 、# 、! 、\ 符号 并且长度为1至30的任意字符（注意Markdown关键字情况，例如感叹号加字母情况@!aa需要转义输入@\!aa）
const mentionRegex:any = new RegExp(
  "(?:^|\\s)@(" + userGroup + ")",
  "gi"
);

/**
 *
 * @type {import("unified").Plugin<[Options?]|void[], Root>}
 */
export default function remarkMentions(
  opts = { usernameLink: (/** @type {string} */ username:string) => `/${username}` }
) {
  // @ts-ignore
  return (tree:any, _file:any) => {
    findAndReplace(tree, [[mentionRegex, replaceMention]] as any,undefined, undefined);
  };

  /**
   * @type {ReplaceFunction}
   * @param {string} value
   * @param {string} username
   */
function replaceMention(value:string, username:string) {
    /** @type {PhrasingContent[]} */
    let whitespace:any = [];
    
    // Separate leading white space
    if (value.indexOf("@") > 0) {
      whitespace.push({
        type: "text",
        value: value.substring(0, value.indexOf("@")),
      });
    }

    return [
      ...whitespace,
      {
        type: "html",
        value: '<a href="@'+username+'" linktype="mention" target="_blank"><strong>@'+username+'</strong></a>',
      },
    ];

    /**
    return [
      ...whitespace,
      {
        type: "text",
        value: value
      },
    ]; */
     /** 
    return [
      ...whitespace,
      {
        type: "link",
        url: opts.usernameLink(username),
        children: [
          { type: "strong", children: [{ type: "text", value: value.trim() }] }, // Trim the username here
        ],
      },
    ];*/
  }
}