import { useToastContext } from "context/toast/ToastContext";
import { useRouter } from "next/navigation";

import {
  useProviderCompaniesQuery,
  useSendCaseApplicationMutation,
} from "~graphql-api";

const useProviderList = () => {
  const { data, loading } = useProviderCompaniesQuery();
  const [apply] = useSendCaseApplicationMutation();
  const { push } = useRouter();
  const { success, error } = useToastContext();

  const onCompleted = () => {
    success("Application sent successfully");
  };

  const sendApplication = async (providerCompanyId: string) => {
    await apply({
      onCompleted,
      onError: (err) => {
        error(err.message);
      },
      variables: {
        providerCompanyId,
      },
    });
  };

  const providers =
    data?.providerCompanies?.edges?.map((edge) => ({
      id: edge?.node?.id,
      name: edge?.node?.name,
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      location: "Los Angeles, CA",
      rating: edge?.node?.rating ?? 0,
      price: 1000,
      numOfCases: 10,
      onApply: () => sendApplication(edge?.node?.id ?? ""),
      onInfo: () => push(`/providers/${edge?.node?.id}`),
      image:
        "https://media.istockphoto.com/id/1357948071/es/foto/una-hermosa-mujer-afroamericana-sonriendo-mientras-mira-a-la-c%C3%A1mara.jpg?s=1024x1024&w=is&k=20&c=WEnfrRIa6oZrT2DaO9oCb18sm7YlRzH6sju3RtJLiVI=",
    })) ?? [];

  return {
    providers,
    loading,
  };
};

export default useProviderList;
