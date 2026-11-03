let completionDialog;

export function showEstimateCompletion(returnFocus = document.activeElement) {
  if (!completionDialog) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = new URL("./estimate-completion.css", import.meta.url).href;
    document.head.append(stylesheet);
    completionDialog = document.createElement("dialog");
    completionDialog.className = "estimate-completion";
    completionDialog.setAttribute("aria-labelledby", "estimate-completion-title");
    completionDialog.setAttribute("aria-describedby", "estimate-completion-copy");
    completionDialog.innerHTML = `
      <div class="estimate-completion__body">
        <div class="estimate-completion__mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none"><path d="m13 24 8 8 15-16" /></svg>
        </div>
        <h2 id="estimate-completion-title">견적신청이<br>완료되었습니다.</h2>
        <p id="estimate-completion-copy">순차적으로 연락드리겠습니다</p>
        <form method="dialog"><button class="estimate-completion__confirm" autofocus>확인</button></form>
      </div>`;
    document.body.append(completionDialog);
  }
  if (completionDialog.open) return;
  const previousOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";
  completionDialog.addEventListener("close", () => {
    document.documentElement.style.overflow = previousOverflow;
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  }, { once: true });
  completionDialog.showModal();
}
