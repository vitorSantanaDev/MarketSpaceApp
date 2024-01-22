import { useMemo, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { useTheme } from "styled-components/native";
import { MagnifyingGlass, Sliders, X } from "phosphor-react-native";

import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { ConditionFilter } from "./ConditionFilter";
import { InputComponent } from "@components/InputComponent";
import { SwitchComponent } from "@components/SwitchComponent";

import { AdsFiltersDTO } from "./interfaces";
import { EConditions, EConditionsValues } from "@enums/ad.enums";
import {
  EAcceptedPaymentMethods,
  EAcceptedPaymentMethodsValues,
} from "./enums";

import * as S from "./styles";

type FiltersAdsProps = {
  search: string;
  selectedFilters: AdsFiltersDTO;
  showFilters: boolean;
  onToggleFilters: () => void;
  onChangeFilters: (fiters: any) => void;
  onChangeSearch: (search: string) => void;
};

export function FiltersAds({
  search,
  showFilters,
  selectedFilters,
  onChangeSearch,
  onToggleFilters,
  onChangeFilters,
}: FiltersAdsProps) {
  const [filters, setFilters] = useState<AdsFiltersDTO>({
    conditions: selectedFilters.conditions,
    acceptsExchange: selectedFilters.acceptsExchange,
    acceptedPaymentMethods: selectedFilters.acceptedPaymentMethods,
  });

  const { colors } = useTheme();

  const acceptedPaymentMethodsOptions = useMemo(() => {
    return Object.entries(EAcceptedPaymentMethodsValues).map(
      ([key, value]) => ({
        key,
        value,
      })
    );
  }, []);

  const conditionsOptions = useMemo(() => {
    return Object.entries(EConditionsValues).map(([key, value]) => ({
      key,
      value,
    }));
  }, []);

  function handleChangeSelectedFilters(filters: AdsFiltersDTO) {
    onChangeFilters(filters);
    onToggleFilters();
  }

  function handleSelectCondtion(condition: keyof typeof EConditions) {
    const conditionAlreadySelected = filters.conditions?.includes(
      EConditions[condition]
    );

    if (conditionAlreadySelected) {
      setFilters((prev) => ({
        ...prev,
        conditions: prev.conditions.filter(
          (item) => item !== EConditions[condition]
        ),
      }));
      return;
    }

    setFilters((prev) => ({
      ...prev,
      conditions: [...prev.conditions, EConditions[condition]],
    }));
  }

  function handleChangedAcceptsExchange(value: boolean) {
    setFilters((prev) => ({
      ...prev,
      acceptsExchange: value,
    }));
  }

  function handleChangedAcceptedPaymentMethods(
    value: keyof typeof EAcceptedPaymentMethods
  ) {
    const paymentMethodAlreadySelected =
      filters.acceptedPaymentMethods?.includes(EAcceptedPaymentMethods[value]);

    if (paymentMethodAlreadySelected) {
      setFilters((prev) => ({
        ...prev,
        acceptedPaymentMethods: prev.acceptedPaymentMethods.filter(
          (item) => item !== EAcceptedPaymentMethods[value]
        ),
      }));
      return;
    }

    setFilters((prev) => ({
      ...prev,
      acceptedPaymentMethods: [
        ...prev.acceptedPaymentMethods,
        EAcceptedPaymentMethods[value],
      ],
    }));
  }

  function resetFilters() {
    setFilters({
      conditions: [],
      acceptsExchange: false,
      acceptedPaymentMethods: [],
    });
  }

  function thisConditionIsChecked({
    key,
    options,
  }: {
    key: keyof typeof EConditions;
    options: string[];
  }) {
    return options.includes(EConditions[key]);
  }

  function thisPaymentMethodIsChecked({
    key,
    options,
  }: {
    key: keyof typeof EAcceptedPaymentMethods;
    options: string[];
  }) {
    return options.includes(EAcceptedPaymentMethods[key]);
  }

  function RenderCondtions({
    conditions,
  }: {
    conditions: Array<{
      key: string;
      value: EConditionsValues;
    }>;
  }) {
    return (
      <S.ConditionTagsContainer>
        {conditions.map((item) => (
          <ConditionFilter
            key={item.key}
            label={item.value}
            isSelected={thisConditionIsChecked({
              options: filters.conditions,
              key: item.key as keyof typeof EConditions,
            })}
            onPress={() =>
              handleSelectCondtion(item.key as keyof typeof EConditions)
            }
          />
        ))}
      </S.ConditionTagsContainer>
    );
  }

  function RenderAcceptedPaymentMethods({
    paymentMethods,
  }: {
    paymentMethods: Array<{
      key: string;
      value: EAcceptedPaymentMethodsValues;
    }>;
  }) {
    return (
      <S.AcceptedPaymentMethodsContainer>
        {paymentMethods.map((item) => (
          <S.AcceptedPaymentMethodsRow key={item.key}>
            <Checkbox
              isChecked={thisPaymentMethodIsChecked({
                options: filters.acceptedPaymentMethods,
                key: item.key as keyof typeof EAcceptedPaymentMethods,
              })}
              onCheck={(_) =>
                handleChangedAcceptedPaymentMethods(
                  item.key as keyof typeof EAcceptedPaymentMethods
                )
              }
            />
            <S.AcceptedPaymentMethodsLabel>
              {item.value}
            </S.AcceptedPaymentMethodsLabel>
          </S.AcceptedPaymentMethodsRow>
        ))}
      </S.AcceptedPaymentMethodsContainer>
    );
  }

  return (
    <>
      <S.SearchInputContainer>
        <View style={{ flex: 1 }}>
          <InputComponent
            value={search}
            style={{ borderRadius: 0 }}
            placeholder="Buscar anúncio"
            onChangeText={onChangeSearch}
          />
        </View>
        <S.FilterActionsContainer>
          <Pressable>
            <MagnifyingGlass weight="bold" size={20} color={colors.gray_2} />
          </Pressable>
          <S.Divider />
          <Pressable
            hitSlop={{
              top: 4,
              left: 4,
              right: 4,
              bottom: 4,
            }}
            onPress={onToggleFilters}
            children={({ pressed }) => (
              <Sliders
                size={20}
                weight="bold"
                color={colors.gray_2}
                style={pressed && { opacity: 0.5 }}
              />
            )}
          />
        </S.FilterActionsContainer>
      </S.SearchInputContainer>
      {showFilters && (
        <Modal animationType="fade" transparent visible={showFilters}>
          <S.ModalContainer>
            <S.ModalContent>
              <S.ModalDivider />
              <S.ModalHeader>
                <S.ModalTitle>Filtrar anúncios</S.ModalTitle>
                <Pressable
                  onPress={onToggleFilters}
                  children={({ pressed }) => (
                    <X
                      size={24}
                      weight="regular"
                      color={colors.gray_4}
                      style={pressed && { opacity: 0.5 }}
                    />
                  )}
                />
              </S.ModalHeader>
              <S.SectionTitle>Condição</S.SectionTitle>
              <RenderCondtions conditions={conditionsOptions} />
              <S.SectionTitle>Aceita Troca?</S.SectionTitle>
              <SwitchComponent
                value={filters.acceptsExchange}
                onValueChange={handleChangedAcceptsExchange}
                style={{ width: 50, marginBottom: 24, marginTop: 12 }}
              />
              <S.SectionTitle>Meios de pagamento aceitos</S.SectionTitle>
              <RenderAcceptedPaymentMethods
                paymentMethods={acceptedPaymentMethodsOptions}
              />
            </S.ModalContent>
            <S.ButtonActionsContainer>
              <Button
                bgColor="gray_5"
                label="Resetar filtros"
                labelStyle={{ color: "gray_2" }}
                onPress={resetFilters}
              />
              <Button
                bgColor="gray_1"
                label="Aplicar filtros"
                labelStyle={{ color: "gray_7" }}
                onPress={() => handleChangeSelectedFilters(filters)}
              />
            </S.ButtonActionsContainer>
          </S.ModalContainer>
        </Modal>
      )}
    </>
  );
}
