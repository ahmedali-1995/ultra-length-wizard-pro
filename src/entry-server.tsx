import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { renderToString } from 'react-dom/server'

// This helps with SSR by providing a simulated environment for components
// that might rely on browser-only APIs
if (typeof window === 'undefined') {
  // Create proper mockups for DOM elements with correct TypeScript types
  
  // Mock NodeList with required item method
  class MockNodeList<T extends Node> implements NodeListOf<T> {
    private nodes: T[] = [];
    
    [index: number]: T;
    length = 0;
    
    item(index: number): T | null {
      return this.nodes[index] || null;
    }
    
    forEach(callbackfn: (value: T, key: number, parent: NodeListOf<T>) => void): void {
      this.nodes.forEach((node, i) => callbackfn(node, i, this));
    }
    
    entries(): IterableIterator<[number, T]> {
      return this.nodes.entries();
    }
    
    keys(): IterableIterator<number> {
      return this.nodes.keys();
    }
    
    values(): IterableIterator<T> {
      return this.nodes.values();
    }
    
    [Symbol.iterator](): IterableIterator<T> {
      return this.nodes[Symbol.iterator]();
    }
  }
  
  // Mock HTMLCollection with required item and namedItem methods
  class MockHTMLCollection<T extends Element> implements HTMLCollectionOf<T> {
    private elements: T[] = [];
    
    [index: number]: T;
    length = 0;
    
    item(index: number): T | null {
      return this.elements[index] || null;
    }
    
    namedItem(name: string): T | null {
      return this.elements.find(el => el.id === name || el.getAttribute('name') === name) || null;
    }
    
    [Symbol.iterator](): IterableIterator<T> {
      return this.elements[Symbol.iterator]();
    }
  }
  
  // Create a mock Text node that satisfies the Text interface
  class MockText implements Text {
    nodeType = 3;
    nodeName = "#text";
    data = "";
    length = 0;
    baseURI = "";
    isConnected = false;
    parentNode: Node | null = null;
    parentElement: HTMLElement | null = null;
    previousSibling: Node | null = null;
    nextSibling: Node | null = null;
    nodeValue = "";
    textContent = "";
    ELEMENT_NODE = Node.ELEMENT_NODE;
    ATTRIBUTE_NODE = Node.ATTRIBUTE_NODE;
    TEXT_NODE = Node.TEXT_NODE;
    CDATA_SECTION_NODE = Node.CDATA_SECTION_NODE;
    PROCESSING_INSTRUCTION_NODE = Node.PROCESSING_INSTRUCTION_NODE;
    COMMENT_NODE = Node.COMMENT_NODE;
    DOCUMENT_NODE = Node.DOCUMENT_NODE;
    DOCUMENT_TYPE_NODE = Node.DOCUMENT_TYPE_NODE;
    DOCUMENT_FRAGMENT_NODE = Node.DOCUMENT_FRAGMENT_NODE;
    
    wholeText = "";
    
    assignedSlot: HTMLSlotElement | null = null;
    childNodes = new MockNodeList<ChildNode>();
    firstChild: ChildNode | null = null;
    lastChild: ChildNode | null = null;
    
    ownerDocument: Document = {} as Document;
    
    appendChild<T extends Node>(node: T): T {
      return node;
    }
    
    cloneNode(deep?: boolean): Text {
      return new MockText();
    }
    
    compareDocumentPosition(other: Node): number {
      return 0;
    }
    
    contains(other: Node | null): boolean {
      return false;
    }
    
    getRootNode(options?: GetRootNodeOptions): Node {
      return this;
    }
    
    hasChildNodes(): boolean {
      return false;
    }
    
    insertBefore<T extends Node>(node: T, child: Node | null): T {
      return node;
    }
    
    isDefaultNamespace(namespace: string | null): boolean {
      return false;
    }
    
    isEqualNode(otherNode: Node | null): boolean {
      return false;
    }
    
    isSameNode(otherNode: Node | null): boolean {
      return false;
    }
    
    lookupNamespaceURI(prefix: string | null): string | null {
      return null;
    }
    
    lookupPrefix(namespace: string | null): string | null {
      return null;
    }
    
    normalize(): void {}
    
    removeChild<T extends Node>(child: T): T {
      return child;
    }
    
    replaceChild<T extends Node>(node: Node, child: T): T {
      return child;
    }
    
    splitText(offset: number): Text {
      return new MockText();
    }
    
    after(...nodes: (Node | string)[]): void {}
    before(...nodes: (Node | string)[]): void {}
    remove(): void {}
    replaceWith(...nodes: (Node | string)[]): void {}
    
    addEventListener(...args: any[]): void {}
    removeEventListener(...args: any[]): void {}
    dispatchEvent(event: Event): boolean {
      return true;
    }
  }
  
  // Create a mock CSSStyleDeclaration with all required properties
  class MockCSSStyleDeclaration implements CSSStyleDeclaration {
    [index: number]: string;
    length = 0;
    cssText = "";
    cssFloat = "";
    parentRule: CSSRule | null = null;
    
    // Add all CSS properties (simplified version with most common ones)
    accentColor = "";
    alignContent = "";
    alignItems = "";
    alignSelf = "";
    all = "";
    animation = "";
    animationDelay = "";
    animationDirection = "";
    animationDuration = "";
    animationFillMode = "";
    animationIterationCount = "";
    animationName = "";
    animationPlayState = "";
    animationTimingFunction = "";
    appearance = "";
    aspectRatio = "";
    backdropFilter = "";
    backfaceVisibility = "";
    background = "";
    backgroundColor = "";
    backgroundImage = "";
    backgroundPosition = "";
    backgroundRepeat = "";
    backgroundSize = "";
    border = "";
    borderBottom = "";
    borderBottomColor = "";
    borderBottomLeftRadius = "";
    borderBottomRightRadius = "";
    borderBottomStyle = "";
    borderBottomWidth = "";
    borderCollapse = "";
    borderColor = "";
    borderImage = "";
    borderRadius = "";
    borderStyle = "";
    borderTop = "";
    borderRight = "";
    borderLeft = "";
    borderWidth = "";
    bottom = "";
    boxShadow = "";
    boxSizing = "";
    clear = "";
    color = "";
    columnCount = "";
    columnGap = "";
    columnRule = "";
    columns = "";
    content = "";
    cursor = "";
    direction = "";
    display = "";
    filter = "";
    flex = "";
    flexBasis = "";
    flexDirection = "";
    flexFlow = "";
    flexGrow = "";
    flexShrink = "";
    flexWrap = "";
    float = "";
    font = "";
    fontFamily = "";
    fontSize = "";
    fontStyle = "";
    fontVariant = "";
    fontWeight = "";
    gap = "";
    grid = "";
    gridArea = "";
    gridAutoColumns = "";
    gridAutoFlow = "";
    gridAutoRows = "";
    gridColumn = "";
    gridColumnEnd = "";
    gridColumnGap = "";
    gridColumnStart = "";
    gridGap = "";
    gridRow = "";
    gridRowEnd = "";
    gridRowGap = "";
    gridRowStart = "";
    gridTemplate = "";
    gridTemplateAreas = "";
    gridTemplateColumns = "";
    gridTemplateRows = "";
    height = "";
    justifyContent = "";
    left = "";
    letterSpacing = "";
    lineHeight = "";
    listStyle = "";
    margin = "";
    marginBottom = "";
    marginLeft = "";
    marginRight = "";
    marginTop = "";
    maxHeight = "";
    maxWidth = "";
    minHeight = "";
    minWidth = "";
    opacity = "";
    order = "";
    outline = "";
    overflow = "";
    overflowX = "";
    overflowY = "";
    padding = "";
    paddingBottom = "";
    paddingLeft = "";
    paddingRight = "";
    paddingTop = "";
    pageBreakAfter = "";
    pageBreakBefore = "";
    perspective = "";
    pointerEvents = "";
    position = "";
    quotes = "";
    resize = "";
    right = "";
    rowGap = "";
    scrollBehavior = "";
    textAlign = "";
    textDecoration = "";
    textIndent = "";
    textOverflow = "";
    textShadow = "";
    textTransform = "";
    top = "";
    transform = "";
    transformOrigin = "";
    transition = "";
    transitionDelay = "";
    transitionDuration = "";
    transitionProperty = "";
    transitionTimingFunction = "";
    userSelect = "";
    verticalAlign = "";
    visibility = "";
    whiteSpace = "";
    width = "";
    wordBreak = "";
    wordSpacing = "";
    wordWrap = "";
    zIndex = "";
    zoom = "";
    
    getPropertyPriority(property: string): string {
      return "";
    }
    
    getPropertyValue(property: string): string {
      return "";
    }
    
    item(index: number): string {
      return "";
    }
    
    removeProperty(property: string): string {
      return "";
    }
    
    setProperty(property: string, value: string, priority?: string): void {}
    
    [Symbol.iterator](): IterableIterator<string> {
      return [].values();
    }
  }
  
  // Create a more complete HTMLElement mock
  class MockHTMLElement implements HTMLElement {
    // Node properties
    nodeType = Node.ELEMENT_NODE;
    nodeName = "DIV";
    baseURI = "";
    isConnected = false;
    parentNode: Node | null = null;
    parentElement: HTMLElement | null = null;
    previousSibling: Node | null = null;
    nextSibling: Node | null = null;
    nodeValue: string | null = null;
    textContent: string | null = "";
    
    // Element properties
    tagName = "DIV";
    id = "";
    className = "";
    classList = {
      add: () => {},
      remove: () => {},
      toggle: () => false,
      contains: () => false,
      replace: () => false,
      supports: () => false,
      value: "",
      length: 0,
      item: () => null,
      toString: () => "",
      entries: () => [][Symbol.iterator](),
      keys: () => [][Symbol.iterator](),
      values: () => [][Symbol.iterator](),
      forEach: () => {},
      [Symbol.iterator]: () => [][Symbol.iterator]()
    };
    slot = "";
    attributes = [] as unknown as NamedNodeMap;
    shadowRoot: ShadowRoot | null = null;
    
    // HTMLElement properties
    accessKey = "";
    accessKeyLabel = "";
    autocapitalize = "";
    dir = "";
    draggable = false;
    hidden = false;
    inert = false;
    innerText = "";
    lang = "";
    offsetHeight = 0;
    offsetLeft = 0;
    offsetParent: Element | null = null;
    offsetTop = 0;
    offsetWidth = 0;
    outerText = "";
    spellcheck = true;
    title = "";
    translate = true;
    
    style = new MockCSSStyleDeclaration();
    
    // Element methods
    getAttribute(name: string): string | null {
      return null;
    }
    
    getAttributeNS(namespace: string | null, localName: string): string | null {
      return null;
    }
    
    getAttributeNames(): string[] {
      return [];
    }
    
    getAttributeNode(name: string): Attr | null {
      return null;
    }
    
    getAttributeNodeNS(namespace: string | null, localName: string): Attr | null {
      return null;
    }
    
    getBoundingClientRect(): DOMRect {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        toJSON: () => {}
      };
    }
    
    getClientRects(): DOMRectList {
      return {
        length: 0,
        item: () => null,
        [Symbol.iterator]: () => [][Symbol.iterator]()
      };
    }
    
    getElementsByClassName(classNames: string): HTMLCollectionOf<Element> {
      return new MockHTMLCollection<Element>();
    }
    
    getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element> {
      return new MockHTMLCollection<Element>();
    }
    
    getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<Element> {
      return new MockHTMLCollection<Element>();
    }
    
    hasAttribute(name: string): boolean {
      return false;
    }
    
    hasAttributeNS(namespace: string | null, localName: string): boolean {
      return false;
    }
    
    hasAttributes(): boolean {
      return false;
    }
    
    hasPointerCapture(pointerId: number): boolean {
      return false;
    }
    
    matches(selectors: string): boolean {
      return false;
    }
    
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null {
      return null;
    }
    
    querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null {
      return null;
    }
    
    querySelector<E extends Element = Element>(selectors: string): E | null {
      return null;
    }
    
    querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]> {
      return new MockNodeList<HTMLElementTagNameMap[K]>();
    }
    
    querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]> {
      return new MockNodeList<SVGElementTagNameMap[K]>();
    }
    
    querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E> {
      return new MockNodeList<E>();
    }
    
    releasePointerCapture(pointerId: number): void {}
    
    removeAttribute(name: string): void {}
    
    removeAttributeNS(namespace: string | null, localName: string): void {}
    
    removeAttributeNode(attr: Attr): Attr {
      return {} as Attr;
    }
    
    setAttribute(name: string, value: string): void {}
    
    setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void {}
    
    setAttributeNode(attr: Attr): Attr | null {
      return null;
    }
    
    setAttributeNodeNS(attr: Attr): Attr | null {
      return null;
    }
    
    setPointerCapture(pointerId: number): void {}
    
    toggleAttribute(qualifiedName: string, force?: boolean): boolean {
      return false;
    }
    
    // Node methods
    appendChild<T extends Node>(node: T): T {
      return node;
    }
    
    cloneNode(deep?: boolean): Node {
      return new MockHTMLElement();
    }
    
    compareDocumentPosition(other: Node): number {
      return 0;
    }
    
    contains(other: Node | null): boolean {
      return false;
    }
    
    getRootNode(options?: GetRootNodeOptions): Node {
      return this;
    }
    
    hasChildNodes(): boolean {
      return false;
    }
    
    insertBefore<T extends Node>(node: T, child: Node | null): T {
      return node;
    }
    
    isDefaultNamespace(namespace: string | null): boolean {
      return false;
    }
    
    isEqualNode(otherNode: Node | null): boolean {
      return false;
    }
    
    isSameNode(otherNode: Node | null): boolean {
      return false;
    }
    
    lookupNamespaceURI(prefix: string | null): string | null {
      return null;
    }
    
    lookupPrefix(namespace: string | null): string | null {
      return null;
    }
    
    normalize(): void {}
    
    removeChild<T extends Node>(child: T): T {
      return child;
    }
    
    replaceChild<T extends Node>(node: Node, child: T): T {
      return child;
    }
    
    // EventTarget methods
    addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {}
    
    removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void {}
    
    dispatchEvent(event: Event): boolean {
      return true;
    }
    
    // Additional HTMLElement methods
    blur(): void {}
    click(): void {}
    focus(options?: FocusOptions): void {}
    
    // Non-standard but required properties
    localName = "div";
    namespaceURI = "http://www.w3.org/1999/xhtml";
    prefix: string | null = null;
    ELEMENT_NODE = Node.ELEMENT_NODE;
    ATTRIBUTE_NODE = Node.ATTRIBUTE_NODE;
    TEXT_NODE = Node.TEXT_NODE;
    CDATA_SECTION_NODE = Node.CDATA_SECTION_NODE;
    PROCESSING_INSTRUCTION_NODE = Node.PROCESSING_INSTRUCTION_NODE;
    COMMENT_NODE = Node.COMMENT_NODE;
    DOCUMENT_NODE = Node.DOCUMENT_NODE;
    DOCUMENT_TYPE_NODE = Node.DOCUMENT_TYPE_NODE;
    DOCUMENT_FRAGMENT_NODE = Node.DOCUMENT_FRAGMENT_NODE;
    
    childNodes = new MockNodeList<ChildNode>();
    firstChild: ChildNode | null = null;
    lastChild: ChildNode | null = null;
    ownerDocument: Document | null = null;
    
    // Element-specific properties
    innerHTML = "";
    outerHTML = "";
    
    // Additional HTMLElement lifecycle methods
    attachInternals(): ElementInternals {
      throw new Error("Not implemented");
    }
    
    // Other ElementCSSInlineStyle methods
    attributeStyleMap: StylePropertyMap = {} as StylePropertyMap;
    
    after(...nodes: (Node | string)[]): void {}
    before(...nodes: (Node | string)[]): void {}
    remove(): void {}
    replaceWith(...nodes: (Node | string)[]): void {}
    
    ariaAtomic = null;
    ariaAutoComplete = null;
    ariaBusy = null;
    ariaChecked = null;
    ariaColCount = null;
    ariaColIndex = null;
    ariaColSpan = null;
    ariaCurrent = null;
    ariaDisabled = null;
    ariaExpanded = null;
    ariaHasPopup = null;
    ariaHidden = null;
    ariaKeyShortcuts = null;
    ariaLabel = null;
    ariaLevel = null;
    ariaLive = null;
    ariaModal = null;
    ariaMultiLine = null;
    ariaMultiSelectable = null;
    ariaOrientation = null;
    ariaPlaceholder = null;
    ariaPosInSet = null;
    ariaPressed = null;
    ariaReadOnly = null;
    ariaRequired = null;
    ariaRoleDescription = null;
    ariaRowCount = null;
    ariaRowIndex = null;
    ariaRowSpan = null;
    ariaSelected = null;
    ariaSetSize = null;
    ariaSort = null;
    ariaValueMax = null;
    ariaValueMin = null;
    ariaValueNow = null;
    ariaValueText = null;
    
    // Non-standard properties for compatibility
    dataset: DOMStringMap = {} as DOMStringMap;
    tabIndex = 0;
  }

  // Create a mock document that satisfies Document interface
  class MockDocument implements Document {
    // Create references for circular structure
    documentElement = new MockHTMLElement();
    head = new MockHTMLElement();
    body = new MockHTMLElement();
    
    // Basic Document properties
    URL = "";
    baseURI = "";
    characterSet = "UTF-8";
    compatMode = "CSS1Compat";
    contentType = "text/html";
    doctype: DocumentType | null = null;
    documentURI = "";
    domain = "";
    
    // Node properties
    nodeType = Node.DOCUMENT_NODE;
    nodeName = "#document";
    nodeValue: string | null = null;
    textContent: string | null = null;
    
    // Document methods that satisfy TypeScript
    createElement<K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElementTagNameMap[K] {
      return new MockHTMLElement() as unknown as HTMLElementTagNameMap[K];
    }
    
    createElementNS(namespace: string | null, qualifiedName: string): Element {
      return new MockHTMLElement();
    }
    
    createTextNode(data: string): Text {
      return new MockText();
    }
    
    querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null {
      return null;
    }
    
    querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]> {
      return new MockNodeList<HTMLElementTagNameMap[K]>();
    }
    
    getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]> {
      return new MockHTMLCollection<HTMLElementTagNameMap[K]>();
    }
    
    getElementsByClassName(classNames: string): HTMLCollectionOf<Element> {
      return new MockHTMLCollection<Element>();
    }
    
    getElementById(elementId: string): HTMLElement | null {
      return null;
    }
    
    // The rest of Document interface methods minimally implemented
    adoptNode<T extends Node>(node: T): T { return node; }
    append(...nodes: (Node | string)[]): void {}
    captureEvents(): void {}
    caretRangeFromPoint(x: number, y: number): Range | null { return null; }
    clear(): void {}
    close(): void {}
    createAttribute(name: string): Attr { return {} as Attr; }
    createAttributeNS(namespace: string | null, qualifiedName: string): Attr { return {} as Attr; }
    createCDATASection(data: string): CDATASection { return {} as CDATASection; }
    createComment(data: string): Comment { return {} as Comment; }
    createDocumentFragment(): DocumentFragment { return {} as DocumentFragment; }
    createEvent(eventInterface: string): Event { return new Event(""); }
    createNodeIterator(root: Node, whatToShow?: number, filter?: NodeFilter | null): NodeIterator { return {} as NodeIterator; }
    createProcessingInstruction(target: string, data: string): ProcessingInstruction { return {} as ProcessingInstruction; }
    createRange(): Range { return {} as Range; }
    createTreeWalker(root: Node, whatToShow?: number, filter?: NodeFilter | null): TreeWalker { return {} as TreeWalker; }
    execCommand(commandId: string, showUI?: boolean, value?: string): boolean { return true; }
    exitFullscreen(): Promise<void> { return Promise.resolve(); }
    exitPictureInPicture(): Promise<void> { return Promise.resolve(); }
    exitPointerLock(): void {}
    getAnimations(): Animation[] { return []; }
    getSelection(): Selection | null { return null; }
    hasFocus(): boolean { return false; }
    importNode<T extends Node>(node: T, deep?: boolean): T { return node; }
    open(url?: string, name?: string, features?: string): Window | null { return null; }
    prepend(...nodes: (Node | string)[]): void {}
    queryCommandEnabled(commandId: string): boolean { return false; }
    queryCommandIndeterm(commandId: string): boolean { return false; }
    queryCommandState(commandId: string): boolean { return false; }
    queryCommandSupported(commandId: string): boolean { return false; }
    queryCommandValue(commandId: string): string { return ""; }
    releaseEvents(): void {}
    write(...text: string[]): void {}
    writeln(...text: string[]): void {}
    
    // EventTarget methods
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void {}
    dispatchEvent(event: Event): boolean { return true; }
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void {}
    
    // Node methods
    appendChild<T extends Node>(node: T): T { return node; }
    cloneNode(deep?: boolean): Document { return this; }
    compareDocumentPosition(other: Node): number { return 0; }
    contains(other: Node | null): boolean { return false; }
    getRootNode(options?: GetRootNodeOptions): Node { return this; }
    hasChildNodes(): boolean { return false; }
    insertBefore<T extends Node>(node: T, child: Node | null): T { return node; }
    isDefaultNamespace(namespace: string | null): boolean { return false; }
    isEqualNode(otherNode: Node | null): boolean { return false; }
    isSameNode(otherNode: Node | null): boolean { return false; }
    lookupNamespaceURI(prefix: string | null): string | null { return null; }
    lookupPrefix(namespace: string | null): string | null { return null; }
    normalize(): void {}
    removeChild<T extends Node>(child: T): T { return child; }
    replaceChild<T extends Node>(node: Node, child: T): T { return child; }
    
    // Document properties required by TypeScript
    activeElement: Element | null = null;
    alinkColor = "";
    all: HTMLAllCollection = new MockHTMLCollection<Element>() as unknown as HTMLAllCollection;
    anchors: HTMLCollectionOf<HTMLAnchorElement> = new MockHTMLCollection<HTMLAnchorElement>();
    applets: HTMLCollectionOf<HTMLAppletElement> = new MockHTMLCollection<HTMLAppletElement>();
    bgColor = "";
    childElementCount = 0;
    childNodes: NodeListOf<ChildNode> = new MockNodeList<ChildNode>();
    children: HTMLCollection = new MockHTMLCollection<Element>();
    cookie = "";
    currentScript: HTMLOrSVGScriptElement | null = null;
    defaultView: Window | null = null;
    designMode = "off";
    dir = "";
    embeds: HTMLCollectionOf<HTMLEmbedElement> = new MockHTMLCollection<HTMLEmbedElement>();
    featurePolicy: FeaturePolicy | null = null;
    fgColor = "";
    firstChild: ChildNode | null = null;
    firstElementChild: Element | null = null;
    fonts: FontFaceSet = {} as FontFaceSet;
    forms: HTMLCollectionOf<HTMLFormElement> = new MockHTMLCollection<HTMLFormElement>();
    fullscreen = false;
    fullscreenElement: Element | null = null;
    fullscreenEnabled = false;
    hidden = false;
    images: HTMLCollectionOf<HTMLImageElement> = new MockHTMLCollection<HTMLImageElement>();
    implementation: DOMImplementation = {} as DOMImplementation;
    isConnected = true;
    lastChild: ChildNode | null = null;
    lastElementChild: Element | null = null;
    lastModified = "";
    linkColor = "";
    links: HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement> = new MockHTMLCollection<HTMLAnchorElement>();
    location: Location = {} as Location;
    nextSibling: ChildNode | null = null;
    onabort: ((this: Document, ev: UIEvent) => any) | null = null;
    onanimationcancel: ((this: Document, ev: AnimationEvent) => any) | null = null;
    onanimationend: ((this: Document, ev: AnimationEvent) => any) | null = null;
    onanimationiteration: ((this: Document, ev: AnimationEvent) => any) | null = null;
    onanimationstart: ((this: Document, ev: AnimationEvent) => any) | null = null;
    onauxclick: ((this: Document, ev: MouseEvent) => any) | null = null;
    onbeforeinput: ((this: Document, ev: InputEvent) => any) | null = null;
    onblur: ((this: Document, ev: FocusEvent) => any) | null = null;
    oncancel: ((this: Document, ev: Event) => any) | null = null;
    oncanplay: ((this: Document, ev: Event) => any) | null = null;
    oncanplaythrough: ((this: Document, ev: Event) => any) | null = null;
    onchange: ((this: Document, ev: Event) => any) | null = null;
    onclick: ((this: Document, ev: MouseEvent) => any) | null = null;
    onclose: ((this: Document, ev: Event) => any) | null = null;
    oncontextmenu: ((this: Document, ev: MouseEvent) => any) | null = null;
    oncopy: ((this: Document, ev: ClipboardEvent) => any) | null = null;
    oncuechange: ((this: Document, ev: Event) => any) | null = null;
    oncut: ((this: Document, ev: ClipboardEvent) => any) | null = null;
    ondblclick: ((this: Document, ev: MouseEvent) => any) | null = null;
    ondrag: ((this: Document, ev: DragEvent) => any) | null = null;
    ondragend: ((this: Document, ev: DragEvent) => any) | null = null;
    ondragenter: ((this: Document, ev: DragEvent) => any) | null = null;
    ondragleave: ((this: Document, ev: DragEvent) => any) | null = null;
    ondragover: ((this: Document, ev: DragEvent) => any) | null = null;
    ondragstart: ((this: Document, ev: DragEvent) => any) | null = null;
    ondrop: ((this: Document, ev: DragEvent) => any) | null = null;
    ondurationchange: ((this: Document, ev: Event) => any) | null = null;
    onemptied: ((this: Document, ev: Event) => any) | null = null;
    onended: ((this: Document, ev: Event) => any) | null = null;
    onerror: OnErrorEventHandler = null;
    onfocus: ((this: Document, ev: FocusEvent) => any) | null = null;
    onformdata: ((this: Document, ev: FormDataEvent) => any) | null = null;
    ongotpointercapture: ((this: Document, ev: PointerEvent) => any) | null = null;
    oninput: ((this: Document, ev: Event) => any) | null = null;
    oninvalid: ((this: Document, ev: Event) => any) | null = null;
    onkeydown: ((this: Document, ev: KeyboardEvent) => any) | null = null;
    onkeypress: ((this: Document, ev: KeyboardEvent) => any) | null = null;
    onkeyup: ((this: Document, ev: KeyboardEvent) => any) | null = null;
    onload: ((this: Document, ev: Event) => any) | null = null;
    onloadeddata: ((this: Document, ev: Event) => any) | null = null;
    onloadedmetadata: ((this: Document, ev: Event) => any) | null = null;
    onloadstart: ((this: Document, ev: Event) => any) | null = null;
    onlostpointercapture: ((this: Document, ev: PointerEvent) => any) | null = null;
    onmousedown: ((this: Document, ev: MouseEvent) => any) | null = null;
    onmouseenter: ((this: Document, ev: MouseEvent) => any) | null = null;
    onmouseleave: ((this: Document, ev: MouseEvent) => any) | null = null;
    onmousemove: ((this: Document, ev: MouseEvent) => any) | null = null;
    onmouseout: ((this: Document, ev: MouseEvent) => any) | null = null;
    onmouseover: ((this: Document, ev: MouseEvent) => any) | null = null;
    onmouseup: ((this: Document, ev: MouseEvent) => any) | null = null;
    onpaste: ((this: Document, ev: ClipboardEvent) => any) | null = null;
    onpause: ((this: Document, ev: Event) => any) | null = null;
    onplay: ((this: Document, ev: Event) => any) | null = null;
    onplaying: ((this: Document, ev: Event) => any) | null = null;
    onpointercancel: ((this: Document, ev: PointerEvent) => any) | null = null;
    onpointerdown: ((this: Document, ev: PointerEvent) => any) | null = null;
    onpointerenter: ((this: Document, ev: PointerEvent) => any) | null = null;
    onpointerleave: ((this: Document, ev: PointerEvent) => any) | null = null;
    onpointermove: ((this: Document, ev: PointerEvent) => any) | null = null;
    onpointerout: ((this: Document, ev: PointerEvent) => any) | null = null;
    onpointerover: ((this: Document, ev: PointerEvent) => any) | null = null;
    onpointerup: ((this: Document, ev: PointerEvent) => any) | null = null;
    onprogress: ((this: Document, ev: ProgressEvent) => any) | null = null;
    onratechange: ((this: Document, ev: Event) => any) | null = null;
    onreset: ((this: Document, ev: Event) => any) | null = null;
    onresize: ((this: Document, ev: UIEvent) => any) | null = null;
    onscroll: ((this: Document, ev: Event) => any) | null = null;
    onsecuritypolicyviolation: ((this: Document, ev: SecurityPolicyViolationEvent) => any) | null = null;
    onseeked: ((this: Document, ev: Event) => any) | null = null;
    onseeking: ((this: Document, ev: Event) => any) | null = null;
    onselect: ((this: Document, ev: Event) => any) | null = null;
    onselectionchange: ((this: Document, ev: Event) => any) | null = null;
    onselectstart: ((this: Document, ev: Event) => any) | null = null;
    onslotchange: ((this: Document, ev: Event) => any) | null = null;
    onstalled: ((this: Document, ev: Event) => any) | null = null;
    onsubmit: ((this: Document, ev: SubmitEvent) => any) | null = null;
    onsuspend: ((this: Document, ev: Event) => any) | null = null;
    ontimeupdate: ((this: Document, ev: Event) => any) | null = null;
    ontoggle: ((this: Document, ev: Event) => any) | null = null;
    ontransitioncancel: ((this: Document, ev: TransitionEvent) => any) | null = null;
    ontransitionend: ((this: Document, ev: TransitionEvent) => any) | null = null;
    ontransitionrun: ((this: Document, ev: TransitionEvent) => any) | null = null;
    ontransitionstart: ((this: Document, ev: TransitionEvent) => any) | null = null;
    onvolumechange: ((this: Document, ev: Event) => any) | null = null;
    onwaiting: ((this: Document, ev: Event) => any) | null = null;
    onwebkitanimationend: ((this: Document, ev: Event) => any) | null = null;
    onwebkitanimationiteration: ((this: Document, ev: Event) => any) | null = null;
    onwebkitanimationstart: ((this: Document, ev: Event) => any) | null = null;
    onwebkittransitionend: ((this: Document, ev: Event) => any) | null = null;
    onwheel: ((this: Document, ev: WheelEvent) => any) | null = null;
    ownerDocument: Document | null = null;
    parentElement: HTMLElement | null = null;
    parentNode: Node | null = null;
    pictureInPictureElement: Element | null = null;
    pictureInPictureEnabled = false;
    plugins: HTMLCollectionOf<HTMLEmbedElement> = new MockHTMLCollection<HTMLEmbedElement>();
    pointerLockElement: Element | null = null;
    previousSibling: ChildNode | null = null;
    readyState: DocumentReadyState = "complete";
    referrer = "";
    rootElement: SVGSVGElement | null = null;
    scripts: HTMLCollectionOf<HTMLScriptElement> = new MockHTMLCollection<HTMLScriptElement>();
    scrollingElement: Element | null = null;
    styleSheets: StyleSheetList = {} as StyleSheetList;
    timeline: DocumentTimeline = {} as DocumentTimeline;
    title = "";
    visibilityState: DocumentVisibilityState = "visible";
    vlinkColor = "";
    fonts: FontFaceSet = {} as FontFaceSet;
  }
  
  // Create document instance with proper circular references
  const mockDocument = new MockDocument();
  mockDocument.documentElement.ownerDocument = mockDocument;
  mockDocument.head.ownerDocument = mockDocument;
  mockDocument.body.ownerDocument = mockDocument;
  
  // @ts-ignore - We're deliberately creating mock objects for SSR
  global.document = mockDocument;

  // @ts-ignore - We're deliberately creating mock objects for SSR
  global.window = {
    matchMedia: () => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }),
    innerWidth: 1024,
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      length: 0,
      clear: () => {},
      key: () => null,
      removeItem: () => {}
    },
    document: mockDocument
  };
}

export function render(url: string, context = {}) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
