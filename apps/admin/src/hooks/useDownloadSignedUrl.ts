import { useDownloadSignedUrlLazyQuery } from "~graphql-api";

const useDownloadSignedUrl = () => {
  const [get] = useDownloadSignedUrlLazyQuery({});

  const download = async (downloadLinkId: string) => {
    const url = await get({
      fetchPolicy: "network-only",
      variables: {
        downloadLinkId,
      },
    });

    return url.data?.downloadLink ?? "";
  };

  return download;
};

export default useDownloadSignedUrl;
