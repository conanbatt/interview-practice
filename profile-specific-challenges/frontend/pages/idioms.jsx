import {
  AvoidingUseState,
  CrudeDeclarations,
  CrudeStateManagement,
  DangerousIdentifier,
  DirtyUnmount,
  FunctionsAsComponents,
  IncorrectDependencies,
  MagicNumbers,
  SerialLoading,
  SubstandardDataStructure,
  UnidiomaticHTMLHierarchy,
  UnidiomaticHTMLStructure,
  UnnecessaryEffectTriggering,
  UnnecessaryFunctionRedefinitions,
  UnoptimizableRenderingStructure,
  UntraceableState,
  UseEffect,
  UseEffectDerivedCalculation,
  UseEffectLifeCycle,
} from "@/components/idioms";

export default function Idioms() {
  return (
    <div>
      <FunctionsAsComponents />

      <UseEffect
        label="Pokemon"
        fetchURL="https://pokeapi.co/api/v2/pokemon/"
      />

      <UseEffectDerivedCalculation />

      <UseEffectLifeCycle />

      <DirtyUnmount />

      <AvoidingUseState />

      <UntraceableState />

      <CrudeDeclarations />

      <MagicNumbers age={20} />

      <UnidiomaticHTMLStructure />

      <CrudeStateManagement />

      <UnidiomaticHTMLHierarchy />

      <SubstandardDataStructure />

      <DangerousIdentifier />

      <UnnecessaryEffectTriggering />

      <IncorrectDependencies records={[{ id: 1, name: "Name" }]} />

      <UnnecessaryFunctionRedefinitions
        emails={["jlc@gmail.com", "asdjmoaifjas"]}
      />

      <SerialLoading />

      <UnoptimizableRenderingStructure
        altRecords={[{ id: 2, name: "Alt Name" }]}
      />
    </div>
  );
}
