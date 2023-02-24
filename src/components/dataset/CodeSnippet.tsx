import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";

interface CodeSampleProps {
  code: string;
  language?: string;
}

export default function CodeSnippet({
  code,
  language = "python",
}: CodeSampleProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language],
    language
  );

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        mt: 2,
        p: 1,
        pl: 2,
        borderRadius: 3,
      }}
    >
      <Button
        variant="outlined"
        size="small"
        sx={{
          position: "absolute",
          right: 40,
          textTransform: "none",
          borderRadius: 2,
        }}
        onClick={handleCopyClick}
      >
        {copySuccess ? "Copied" : "Copy"}
      </Button>

      <Box
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        sx={{
          fontFamily: "monospace",
          whiteSpace: "pre",
          overflowX: "auto",
          p: 2,
        }}
      />
    </Paper>
  );
}
