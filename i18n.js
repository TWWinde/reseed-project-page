(() => {
  "use strict";
  const translations = {
  "Skip to content": "跳转到正文",
  "ReSeed home": "ReSeed 首页",
  "Main navigation": "主导航",
  "Mobile navigation": "移动端导航",
  "Open menu": "打开菜单",
  "Menu": "菜单",
  "Method": "方法",
  "Results": "实验结果",
  "Examples": "生成示例",
  "Citation": "引用",
  "Code": "代码",
  "Authors": "作者",
  "0.3374 (DMD2), 0.3358 (DFD), and 0.4290 (DMD2 + ReSeed)": "0.3374（DMD2）、0.3358（DFD）和 0.4290（DMD2 + ReSeed）",
  "ReSeed restores sample diversity in distilled diffusion models by training residual biases for the first denoising step.": "ReSeed 仅训练首个去噪步骤的残差偏置，恢复蒸馏扩散模型的生成多样性。",
  "ReSeed restores diversity in distilled image and video diffusion models by training a bias adaptor for the first denoising step. The original student stays frozen, with": "ReSeed 通过训练首个去噪步骤的偏置适配器，恢复蒸馏后图像与视频扩散模型的生成多样性。原始学生模型保持冻结，仅增加",
  "0.002–0.004% additional trainable parameters": "0.002–0.004% 的可训练参数",
  "and": "且",
  "no extra sampling steps": "不增加采样步数",
  ".": "。",
  "Graz University of Technology": "格拉茨理工大学",
  "Swiss Data Science Center": "瑞士数据科学中心",
  "Complexity Science Hub": "复杂性科学中心",
  "Same prompt and initial noise": "相同提示词与初始噪声",
  "SD3.5-Medium · 25 seeds": "SD3.5-Medium · 25 个种子",
  "Open the full SD3.5-Medium portrait comparison": "打开完整的 SD3.5-Medium 人像对比图",
  "Three panels of 25 matched-seed portraits: a diverse teacher, a repetitive four-step DMD student, and the same student with diversity restored by ReSeed.": "三组使用相同 25 个种子生成的人像：多样性较高的教师模型、结果较为重复的四步 DMD 学生模型，以及使用 ReSeed 恢复多样性后的学生模型。",
  "SD3.5-Medium with 25 matched initial noise samples per method. From left: teacher, DMD student, and DMD + ReSeed.": "SD3.5-Medium：每种方法使用相同的 25 个初始噪声。从左至右为教师模型、DMD 学生模型和 DMD + ReSeed。",
  "ReSeed adds trainable biases to a frozen student. They are trained on the first denoising interval and switched off for later steps.": "ReSeed 为冻结的学生模型加入可训练偏置。这些偏置仅针对首个去噪区间进行训练，并在后续步骤中关闭。",
  "1 / Teacher target": "1 / 教师目标",
  "Compute the teacher target": "计算教师目标",
  "Run the teacher over the student's first interval using the same prompt and initial noise.": "使用相同的提示词和初始噪声，让教师模型运行学生模型对应的首个去噪区间。",
  "2 / Train the adapter": "2 / 训练适配器",
  "Fit the added biases": "训练新增偏置",
  "Match the student velocity to the teacher target by training the added biases. Keep the original student weights frozen.": "仅训练新增偏置，使学生模型的速度匹配教师目标。原始学生模型的权重保持冻结。",
  "3 / Generate": "3 / 生成",
  "Apply the biases in step one": "仅在第一步启用偏置",
  "Use the adapted student for step one and the original student for steps two through four.": "第一步使用加入偏置后的学生模型，第二至第四步使用原始学生模型。",
  "Animated explanation of ReSeed training and generation": "ReSeed 训练与生成过程动画",
  "Training and inference": "训练与推理",
  "Pause": "暂停",
  "Play": "播放",
  "Replay ↺": "重播 ↺",
  "Pause animation": "暂停动画",
  "Play animation": "播放动画",
  "Replay animation from the beginning": "从头重播动画",
  "Explanation stages": "讲解阶段",
  "Teacher target": "教师目标",
  "Fit bias β": "训练偏置 β",
  "Generate": "生成",
  "Training": "训练",
  "Teacher and student frozen": "教师与学生模型均冻结",
  "same noise + prompt": "相同噪声与提示词",
  "Teacher": "教师模型",
  "frozen": "已冻结",
  "Interval endpoint": "区间终点",
  "Average velocity over the student's first interval": "学生模型首个区间内的平均速度",
  "+ bias β": "+ 偏置 β",
  "Student": "学生模型",
  "base weights frozen": "原始权重冻结",
  "First-step velocity": "首步速度",
  "Train β only": "仅训练 β",
  "Match the fixed teacher target": "匹配固定的教师目标",
  "Inference": "推理",
  "no teacher call": "无需调用教师",
  "new noise + prompt": "新噪声与提示词",
  "bias β on": "启用偏置 β",
  "bias β off": "关闭偏置 β",
  "Step 1": "第1步",
  "Steps 2–4": "第2–4步",
  "adapted student": "适配后的学生",
  "original student": "原始学生",
  "Diverse generated outputs": "多样化的生成结果",
  "The frozen teacher computes the target velocity from the same prompt and initial noise.": "冻结的教师模型使用相同的提示词和初始噪声，计算目标速度。",
  "Train only the added biases β to match the teacher velocity. Keep the student weights frozen.": "仅训练新增偏置 β，使其匹配教师速度。学生模型的原始权重保持冻结。",
  "Apply the learned biases in step 1. Run the original student for steps 2–4.": "第一步启用学到的偏置，第二至第四步使用原始学生模型。",
  "View method figure ↗": "查看方法图 ↗",
  "Motion off": "动画已关闭",
  "Animation disabled by reduced motion setting": "已根据减少动态效果的设置关闭动画",
  "We evaluate three image models and one video model. The added biases account for 0.002–0.004% of denoiser parameters. The table reports diversity, FID, and the number of added parameters.": "我们评估了三个图像模型和一个视频模型。新增偏置占去噪模型参数的 0.002–0.004%。下表报告多样性、FID 和新增参数量。",
  "FLUX.1-dev · 4-step student": "FLUX.1-dev · 四步学生模型",
  "DINOv3 diversity with 233,472 trainable bias parameters. FID decreases from 40.22 to 34.65.": "使用 233,472 个可训练偏置参数提高 DINOv3 多样性。FID 从 40.22 降至 34.65。",
  "Quality trade-offs": "质量权衡",
  "DINO diversity and FID improve on the image models, while PickScore or HPS can decrease. For video, text alignment and dynamic degree decrease.": "在图像模型上，DINO 多样性和 FID 均有改善，但 PickScore 或 HPS 可能下降。在视频模型上，文本对齐度和运动幅度有所下降。",
  "Main ReSeed results": "ReSeed 主要实验结果",
  "Student and student + ReSeed results. Image diversity uses DINOv3; video diversity uses DINOv2.": "学生模型与加入 ReSeed 后的结果。图像多样性使用 DINOv3，视频多样性使用 DINOv2。",
  "Generator": "生成模型",
  "DINO diversity ↑": "DINO 多样性 ↑",
  "Relative gain": "相对提升",
  "Added parameters": "新增参数",
  "Not evaluated": "未评估",
  "Image results use the paper's COCO and same-prompt diversity protocols. Video results use 320 VBench prompts and one adapter training run.": "图像结果采用论文中的 COCO 和同提示词多样性评估方案。视频结果基于 320 条 VBench 提示词和一次适配器训练。",
  "Image and video examples": "图像与视频生成示例",
  "Each column uses the same prompt and initial noise across methods. For SD3-Medium and SD3.5-Medium, we show nine of twelve seeds chosen by visual review of ReSeed image quality and variety. FLUX examples use all nine available seeds. All images are uncropped; the table above uses the full evaluation set.": "每一列中，不同方法使用相同的提示词与初始噪声。SD3-Medium 和 SD3.5-Medium 从 12 个种子中，按 ReSeed 的图像质量与多样性选取 9 个展示。FLUX 展示全部 9 个种子。所有图像均未裁剪；上方表格基于完整评估集。",
  "Image comparisons for SD3-Medium, SD3.5-Medium, and FLUX.1-dev": "SD3-Medium、SD3.5-Medium 和 FLUX.1-dev 图像对比",
  "Choose a prompt": "选择提示词",
  "Previous image prompt": "上一个图像提示词",
  "Next image prompt": "下一个图像提示词",
  "Video results": "视频生成结果",
  "Choose one of 20 prompts using the thumbnails below. Each comparison shows eight matched noise samples for DMD2, DFD, and DMD2 + ReSeed. Videos contain 81 frames at 16 fps.": "可通过下方缩略图选择 20 条提示词。每组对比展示 DMD2、DFD 和 DMD2 + ReSeed 使用相同 8 个噪声种子生成的结果。视频共 81 帧，帧率为 16 fps。",
  "Five samples are shown at a time. Use “More samples” to view the rest.": "每次显示 5 个样本，点击“更多样本”查看其余结果。",
  "Previous video prompt": "上一个视频提示词",
  "Next video prompt": "下一个视频提示词",
  "Previous prompt": "上一个提示词",
  "Next prompt": "下一个提示词",
  "Video prompts": "视频提示词",
  "More samples →": "更多样本 →",
  "← First samples": "← 返回前五个样本",
  "Show remaining matched seeds": "查看其余相同种子结果",
  "Show first five matched seeds": "查看前五个相同种子结果",
  "On the full 320-prompt VBench set, video-level DINO diversity is": "在完整的 320 条 VBench 提示词上，视频级 DINO 多样性分别为",
  ". DFD uses the released checkpoint from": "。DFD 使用以下工作公开的检查点：",
  "; ReSeed was trained for 300 updates.": "；ReSeed 训练了 300 次更新。",
  "Summary": "总结",
  "Distilled diffusion models can produce similar outputs from different initial noises. ReSeed trains added bias parameters to match the teacher's first-interval velocity and applies them only during the first student step.": "蒸馏后的扩散模型可能将不同的初始噪声映射到相似的输出。ReSeed 训练新增偏置参数，以匹配教师模型首个区间的速度，并仅在学生模型的第一步启用这些偏置。",
  "Experiments on SD3-Medium, SD3.5-Medium, FLUX.1-dev, and Wan2.1 show higher same-prompt feature diversity. The method keeps the original student weights frozen and uses the same number of sampling steps.": "在 SD3-Medium、SD3.5-Medium、FLUX.1-dev 和 Wan2.1 上的实验表明，同一提示词下的特征多样性得到提高。原始学生模型的权重保持冻结，采样步数不变。",
  "Limitations": "局限性",
  "Training requires a teacher trajectory over the first denoising interval.": "训练需要教师模型在首个去噪区间的轨迹。",
  "We evaluate flow-matching transformers. Other architectures have not been tested.": "目前仅评估了基于流匹配的 Transformer，尚未测试其他架构。",
  "Higher feature diversity can reduce preference scores or text alignment.": "更高的特征多样性可能伴随偏好分数或文本对齐度下降。",
  "Copy BibTeX": "复制 BibTeX",
  "Copy BibTeX citation": "复制 BibTeX 引用",
  "Copied": "已复制",
  "Select text to copy": "请选择文本后复制",
  "Diversity recovery for few-step diffusion models.": "恢复少步扩散模型的生成多样性。",
  "Back to top ↑": "返回顶部 ↑",
  "A barista pours latte art into a cappuccino": "咖啡师为卡布奇诺制作拉花",
  "An elegant ceramic plant pot and hanging plant": "精致的陶瓷花盆与垂吊植物",
  "A young boy lights sparklers at twilight": "男孩在暮色中点燃仙女棒",
  "Scenic view from a wooden pathway": "木栈道上的风景",
  "a black dog wearing halloween costume": "穿着万圣节服装的黑狗",
  "a squirrel eating nuts": "正在吃坚果的松鼠",
  "white rabbit near the fence": "栅栏旁的白兔",
  "close up of wolf": "狼的特写",
  "video of parrots perched on bird stand": "停在鸟架上的鹦鹉",
  "koala eating leaves from a branch": "考拉正在吃树枝上的叶子",
  "a pancake tower with chocolate syrup and strawberries on top": "淋有巧克力酱、顶部摆着草莓的松饼塔",
  "fresh salmon salad on a plate": "盘中的新鲜三文鱼沙拉",
  "beautiful flower decoration": "漂亮的花卉装饰",
  "bamboo leaves backlit by the sun": "阳光逆光下的竹叶",
  "variety of succulent plants on a garden": "花园中的多种多肉植物",
  "tall forest trees on a misty morning": "雾气弥漫的清晨森林中的高大树木",
  "mountain view": "山景",
  "waterfalls in between mountain": "山间瀑布",
  "drone footage of waves crashing on beach shore": "海浪拍打海岸的航拍画面",
  "a scenic view of the golden hour at norway": "挪威黄金时刻的风景",
  "Latte art": "咖啡拉花",
  "Plant pot": "花盆",
  "Sparklers": "仙女棒",
  "Wooden pathway": "木栈道",
  "Halloween dog": "万圣节装扮的狗",
  "Squirrel": "松鼠",
  "White rabbit": "白兔",
  "Wolf": "狼",
  "Parrots": "鹦鹉",
  "Koala": "考拉",
  "Pancakes": "松饼",
  "Salmon salad": "三文鱼沙拉",
  "Flowers": "花卉",
  "Bamboo": "竹叶",
  "Succulents": "多肉植物",
  "Misty forest": "雾中森林",
  "Mountains": "群山",
  "Waterfall": "瀑布",
  "Ocean waves": "海浪",
  "Golden hour": "黄金时刻",
  "Backpack": "背包",
  "Dog": "狗",
  "Couch": "沙发",
  "Handbag": "手提包",
  "Coffee mug": "咖啡杯",
  "Table lamp": "台灯",
  "Cat": "猫",
  "Teddy bear": "泰迪熊",
  "Car": "汽车",
  "Chair": "椅子",
  "Candle": "蜡烛",
  "Fire hydrant": "消防栓",
  "Bird": "鸟",
  "Horse": "马"
};

  const lowerCaseTranslations = new Map(Object.entries(translations).map(([key, value]) => [key.toLowerCase(), value]));
  const textRecords = new WeakMap();
  const attributeRecords = new WeakMap();
  const ignored = "script,style,svg,pre,code,.brand,.authors,#language-select,h1";
  const selector = document.getElementById("language-select");
  const heading = document.querySelector(".hero h1");
  const englishHeading = heading.innerHTML;
  const englishTitle = document.title;
  let language = "en";

  function chinese(text) {
    if (Object.hasOwn(translations, text)) return translations[text];
    const lower = lowerCaseTranslations.get(text.toLowerCase());
    if (lower !== undefined) return lower;
    let match;
    if ((match = text.match(/^a photo of (?:an? )?(.+)$/i))) return `${chinese(match[1])}的照片`;
    if ((match = text.match(/^Play all (\d+) videos$/))) return `播放全部 ${match[1]} 个视频`;
    if ((match = text.match(/^Pause all (\d+) videos$/))) return `暂停全部 ${match[1]} 个视频`;
    if ((match = text.match(/^(.*): (.*); (\d+) image methods across (\d+) matched initial noises$/))) return `${match[1]}：${chinese(match[2])}；${match[3]} 种方法，${match[4]} 个相同初始噪声`;
    if ((match = text.match(/^(.*): three methods across (\d+) matched initial noises?$/))) return `${chinese(match[1])}：3 种方法，${match[2]} 个相同初始噪声`;
    if ((match = text.match(/^(.*), matched example (\d+): (.*)$/))) return `${match[1]}，样本 ${match[2]}：${chinese(match[3])}`;
    if ((match = text.match(/^(.*), seed (\d+): (.*)$/))) return `${match[1]}，种子 ${match[2]}：${chinese(match[3])}`;
    if ((match = text.match(/^(.*) image prompts$/))) return `${match[1]} 图像提示词`;
    return text;
  }

  // Retain English text separately so repeated switches never accumulate edits.
  function translateValue(current, previous) {
    const english = previous && current === previous.output ? previous.english : current;
    const trimmed = english.trim();
    const output = language === "zh-CN" && trimmed ? english.replace(trimmed, chinese(trimmed)) : english;
    return { english, output };
  }

  function translateText(node) {
    if (!node.parentElement || node.parentElement.closest(ignored) || !node.data.trim()) return;
    const record = translateValue(node.data, textRecords.get(node));
    textRecords.set(node, record);
    if (node.data !== record.output) node.data = record.output;
  }

  function translateAttributes(element) {
    if (element.closest("script,style,svg,pre,code,#language-select")) return;
    let records = attributeRecords.get(element);
    if (!records) attributeRecords.set(element, records = new Map());
    for (const name of ["aria-label", "alt", "title"]) {
      if (!element.hasAttribute(name)) continue;
      const record = translateValue(element.getAttribute(name), records.get(name));
      records.set(name, record);
      if (element.getAttribute(name) !== record.output) element.setAttribute(name, record.output);
    }
  }

  function translateTree(root) {
    if (root.nodeType === Node.TEXT_NODE) return translateText(root);
    if (root.nodeType !== Node.ELEMENT_NODE || root.closest(ignored)) return;
    translateAttributes(root);
    root.querySelectorAll("[aria-label],[alt],[title]").forEach(translateAttributes);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) translateText(walker.currentNode);
  }

  function setLanguage(next, remember = true) {
    language = next === "zh-CN" ? "zh-CN" : "en";
    document.documentElement.lang = language;
    selector.value = language;
    document.title = language === "zh-CN" ? "ReSeed — 首步偏置恢复扩散模型蒸馏中丢失的多样性" : englishTitle;
    heading.innerHTML = language === "zh-CN"
      ? '<span class="hero-title-line">用<em>首步偏置</em>恢复</span><span class="hero-title-line">扩散模型蒸馏中丢失的多样性</span>'
      : englishHeading;
    translateTree(document.body);
    if (remember) {
      try { localStorage.setItem("reseed-language", language); } catch { /* Storage can be unavailable in private browsing. */ }
    }
    document.dispatchEvent(new CustomEvent("reseed-languagechange", { detail: { language } }));
  }

  // Translate newly rendered prompts and playback labels without rebuilding media.
  const observer = new MutationObserver(records => {
    if (language === "en") return;
    for (const record of records) {
      if (record.type === "characterData") translateText(record.target);
      else if (record.type === "attributes") translateAttributes(record.target);
      else record.addedNodes.forEach(node => { if (node.isConnected) translateTree(node); });
    }
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "alt", "title"] });
  selector.addEventListener("change", () => setLanguage(selector.value));
  let stored;
  try { stored = localStorage.getItem("reseed-language"); } catch { /* Default to English. */ }
  window.ReSeedI18n = Object.freeze({ setLanguage, get language() { return language; } });
  setLanguage(stored === "zh-CN" ? "zh-CN" : "en", false);
})();
