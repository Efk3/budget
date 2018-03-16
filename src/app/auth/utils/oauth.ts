import { getQueryParams } from '../../utils/get-query-params';
import { FailureType } from '../models/failure-type.model';

export function getAccessTokenFromOAuthUrl(url: Location) {
  const queryParams = getQueryParams(url.href);
  const accessToken = url.href.match(/access_token=([^&]*)/);

  if (queryParams['error'] === 'access_denied') {
    throw new Error(FailureType.ACCESS_DENIED);
  } else if (accessToken) {
    return accessToken[1];
  }

  throw new Error(FailureType.MISSING_TOKEN);
}
