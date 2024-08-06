interface Template {
  id: string;
  type: "1" | "2";
  title: string;
  fontSize: number;
  colourScheme: string;
  margin: number;
  watermark?: string;
}

interface TemplateState {
  items: Template[];
}

interface TemporaryTemplateState {
  detail: Template;
}
