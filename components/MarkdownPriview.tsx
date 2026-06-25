"use client";

import ReactMarkdown
from "react-markdown";

import {
Prism as SyntaxHighlighter,
} from
"react-syntax-highlighter";

export default function MarkdownPreview({
content,
}:{
content:string;
}){

return(

<ReactMarkdown
components={{

code(props){

const {
children,
} = props;

return(
<SyntaxHighlighter
language="javascript"
>
{String(children)}
</SyntaxHighlighter>
);

}

}}
>

{content}

</ReactMarkdown>

);

}
