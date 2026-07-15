import { authHandlers } from "./authHandlers";
import { collectiblesHandlers } from "./collectiblesHandlers";
import { commonHandlers } from "./commonHandlers";
import { missionsHandlers } from "./missionsHandlers";
import { storesHandlers } from "./storesHandlers";
import { usersHandlers } from "./usersHandlers";

// MSW는 위에서부터 매칭되므로 공통 처리영역인 commonHandlers는 맨아래 배치
export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  ...storesHandlers,
  ...missionsHandlers,
  ...collectiblesHandlers,
  ...commonHandlers,
];
